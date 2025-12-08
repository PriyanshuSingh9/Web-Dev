const fs = require('node:fs/promises');

async function clean() {

    let folder = await fs.readdir('clutter', { withFileTypes: true })
    // console.log(folder)

    for (const file of folder) {
        if (file.isDirectory()) {
            continue
        }
        const name = file.name;
        if (!name.includes('.')) continue;

        // const ext = file.split(".").at(-1)
        const ext = file.name.split(".").at(-1)
        console.log(ext)
        try {
            // create folder for each extension type
            await fs.mkdir(`clutter/${ext}`, { recursive: true })
            // move files into respective directories
            await fs.rename(`clutter/${file.name}`, `clutter/${ext}/${file.name}`)
        }
        catch (err) {
            console.error('Error handling', file, err);
        }
    }
}

clean()