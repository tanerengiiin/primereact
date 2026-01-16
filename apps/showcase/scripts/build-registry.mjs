import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const SOURCE_DIR = path.resolve(ROOT, '../../packages/tailwind/src');

const OUTPUT_DIR = path.resolve(ROOT, 'public/r');

const EXCLUDE = ['utils', '__tests__'];

// --------------------------------------------------

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function isDirectory(p) {
    return fs.statSync(p).isDirectory();
}

function readFilesRecursive(dir) {
    return fs.readdirSync(dir).flatMap((file) => {
        const fullPath = path.join(dir, file);

        return isDirectory(fullPath) ? readFilesRecursive(fullPath) : fullPath;
    });
}

function getFiles() {
    return fs
        .readdirSync(SOURCE_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory() && !EXCLUDE.includes(d.name))
        .map((d) => d.name);
}

// --------------------------------------------------

ensureDir(OUTPUT_DIR);

const files = getFiles();

const items = [
    {
        name: 'index',
        type: 'registry:style',
        dependencies: ['primereact@11.0.0-alpha.1', '@primeuix/utils', '@primereact/types'],
        registryDependencies: ['https://raw.githubusercontent.com/tanerengiiin/primereact/refs/heads/v11-next/apps/showcase/public/r/utils.json'],
        files: [],
        cssVars: {
            light: {
                '--p-primary-color': 'var(--p-primary-500)'
            },
            dark: {
                '--p-primary-color': 'var(--p-primary-500)'
            }
        }
    },
    ...files.map((file) => {
        const componentDir = path.join(SOURCE_DIR, file);
        const files = readFilesRecursive(componentDir);
        const { dependencies, registryDependencies } = resolveDependencies(files, file);

        const type = file === 'lib' ? 'registry:lib' : 'registry:ui';

        const item = {
            $schema: 'https://ui.shadcn.com/schema/registry-item.json',
            name: file === 'lib' ? 'utils' : file,
            type,
            title: file.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            registryDependencies: [...registryDependencies, 'https://raw.githubusercontent.com/tanerengiiin/primereact/refs/heads/v11-next/apps/showcase/public/r/index.json'],
            dependencies,
            files: files.map((filePath) => ({
                path: file === 'lib' ? `lib/utils.ts` : `components/ui/${file}/${path.basename(filePath)}`,
                type,
                content: fs.readFileSync(filePath, 'utf-8')
            }))
        };

        //console.log(`✅ ${file}.json written`);

        return item;
    })
];

items.forEach((item) => {
    const outFile = path.join(OUTPUT_DIR, `${item.name}.json`);

    fs.writeFileSync(outFile, JSON.stringify(item, null, 2));
});

//console.log(`\n🎉 Registry items generated: ${files.length}`);

fs.writeFileSync(
    path.join(ROOT, 'registry.json'),
    JSON.stringify(
        {
            $schema: 'https://ui.shadcn.com/schema/registry.json',
            name: 'primereact',
            homepage: 'https://v11.primereact.org',
            items
        },
        null,
        2
    ) + '\n'
);

// UTILS

function extractImports(code) {
    const imports = [];
    const regex = /from\s+['"]([^'"]+)['"]/g;
    let match;

    while ((match = regex.exec(code))) {
        imports.push(match[1]);
    }

    return imports;
}

function isGlobalDependency(source) {
    return source === 'primereact' || source.startsWith('primereact/') || source.startsWith('@primereact/') || source.startsWith('@primeuix/') || source.includes('lib/utils');
}

function classifyImport(source) {
    // ignore react & local
    if (source === 'react' || source.startsWith('./') || source.startsWith('../')) {
        return null;
    }

    //  ignore GLOBAL deps
    if (isGlobalDependency(source)) {
        return null;
    }

    if (source.startsWith('@/components/ui/')) {
        return {
            type: 'registry',
            value: source.replace('@/components/ui/', '')
        };
    }

    // internal registry component (button, input vs)
    if (!source.startsWith('@') && !source.includes('/')) {
        return {
            type: 'registry',
            value: source
        };
    }

    // npm dependency (radix, lucide, etc)
    return {
        type: 'npm',
        value: source
    };
}

function resolveDependencies(files, componentName) {
    const npmDeps = new Set();
    const registryDeps = new Set();

    for (const filePath of files) {
        const code = fs.readFileSync(filePath, 'utf-8');
        const imports = extractImports(code);

        for (const imp of imports) {
            const result = classifyImport(imp, componentName);

            if (!result) continue;

            if (result.type === 'npm') {
                registryDeps.add(result.value);
            }

            if (result.type === 'registry') {
                if (result.value !== componentName) {
                    npmDeps.add(result.value);
                }
            }
        }
    }

    return {
        dependencies: [...npmDeps],
        registryDependencies: [...registryDeps]
    };
}
