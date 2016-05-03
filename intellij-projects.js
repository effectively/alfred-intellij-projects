#! /usr/local/bin/node

const fs = require('fs');
const os = require('os');

const keyword = process.argv[2];
const cache_path = process.env['alfred_workflow_cache'];
const filter = keyword ? file => new RegExp(keyword).test(file.title) : file => !!file.title;

const cache_lock = `${cache_path}/cache.lock`;
const projects_path = `${cache_path}/intellij-projects.cache`;

const error = [
    {
        title: 'No projects found',
        subtitle: 'Projects should be reindexed.Press &lt;Enter&gt; to reindex.',
        arg: '__reindex__'
    }
];

if (fs.existsSync(cache_lock)) {
    console.log(`
        <?xml version="1.0" encoding="UTF-8"?>
        <items>
        <item valid="NO">
                <title>Projects is being indexed. Wait a while.</title>
            </item>
        </items>
    `);
    process.exit(0);
}

fs.readFile(projects_path, 'utf-8', function (err, data) {

    const files = err ? error :
        data.split('\n')
            .map(v=>({title: v.replace(/.*\/(.+)\/\.idea/, '$1'), subtitle: v.replace('.idea', '')}))
            .filter(filter);

    const xml = files.map((v, i)=> {
        return `
            <item uid="${v.title}" valid="YES" type="file">
                <title>${v.title}</title>
                <subtitle>${v.subtitle}</subtitle>
                <arg>${v.arg || v.subtitle}</arg>
                <icon type="fileicon">${v.subtitle}</icon>
            </item>
        `
    }).join('');

    console.log(`
        <?xml version="1.0" encoding="UTF-8"?>
        <items>
            ${xml}
        </items>
    `);

});