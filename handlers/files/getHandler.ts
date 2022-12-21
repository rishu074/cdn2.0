import FilesHandler from "./file";

export default function getFilesHandler() {
    // @ts-ignore
    let filesHandler: FilesHandler = process.FilesHandler
    return filesHandler
}