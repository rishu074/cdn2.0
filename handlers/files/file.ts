import fs from 'fs'
import path from 'path'
import ftp from 'ftp'

export default class FilesHandler {
    private _ftp_enabled: boolean;
    get_file: (filename: string) => Promise<any>;
    private _ftp_client: ftp | undefined;
    Init: () => void;
    upload_file: (data: Buffer, filename: string) => Promise<any>;

    constructor() {
        this._ftp_enabled = process.env.FTP_ENABLED === "true"

        this.Init = this._ftp_enabled ?
            this.__init_ftp__ :
            this.__init_local__
        this._ftp_client = undefined


        this.get_file = this._ftp_enabled ?
            this.__getfile_ftp__ :
            this.__getfile_local__

        this.upload_file = this._ftp_enabled ?
        this.__uploadfile_ftp__ :
            this.__uploadfile_local__

    }

    private __init_local__() {
        try {
            if (!fs.existsSync(path.join(process.cwd(), process.env.SAVE_FOLDER_NAME as string))) {
                fs.mkdirSync(path.join(process.cwd(), process.env.SAVE_FOLDER_NAME as string))
            }
        } catch (error) {
            throw error;
        }
    }

    private __init_ftp__() {
        return new Promise((resolve, reject) => {
            try {
                const FtpClient = new ftp()
                this._ftp_client = FtpClient

                FtpClient.connect({
                    host: process.env.FTP_URL?.split(":")[0],
                    port: parseInt(process.env.FTP_URL?.split(":")[1] as string),
                    user: process.env.FTP_USER,
                    password: process.env.FTP_PASSWORD
                })


                FtpClient.on('ready', () => {
                    FtpClient.listSafe('./', false, (err, list) => {
                        if (err) {
                            throw err;
                        }

                        if (list.indexOf(process.env.SAVE_FOLDER_NAME as any) === -1) {
                            FtpClient.mkdir(`./${process.env.SAVE_FOLDER_NAME}`, true, (err) => {
                                if (err) {
                                    throw err
                                }

                                return resolve(true)
                            })
                        }

                        return resolve(true)
                    })
                })
            } catch (error) {
                throw error;
            }
        })
    }

    private __getfile_local__(filename: string) {
        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(path.join(process.cwd(), process.env.SAVE_FOLDER_NAME as string, filename))) {
                    return reject(new Error("404 Not Found"))
                }
                let stream = fs.createReadStream(path.join(process.cwd(), process.env.SAVE_FOLDER_NAME as string, filename))
                return resolve(stream)
            } catch (error) {
                return reject(error)
            }
        })
    }

    private __getfile_ftp__(filename: string) {
        return new Promise((resolve, reject) => {
            this._ftp_client?.get(`./${process.env.SAVE_FOLDER_NAME}/${filename}`, (err, result) => {
                if (err) {
                    if(err.message.includes("No such file or directory")) {
                        return reject(new Error("404 Not Found"))
                    }
                    return reject(err)
                } else {
                    return resolve(result)
                }
            })
        })
    }
    private __uploadfile_local__(data: Buffer, filename: string) {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFileSync(path.join(process.cwd(), process.env.SAVE_FOLDER_NAME as string, filename), data)
                resolve(true)
            } catch (error) {
                return reject(error)
            }
        })  
    }

    private __uploadfile_ftp__(data: Buffer, filename: string) {
        return new Promise((resolve, reject) => {
            try {
                this._ftp_client?.put(data, `${process.env.SAVE_FOLDER_NAME as string}/${filename}`, (err) => {
                    if(err) {
                        return reject(err)
                    } else {
                        resolve(true)
                    }
                })
            } catch (error) {
                return reject(error)
            }
        })
    }
}