/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from "path"
import * as fs from 'fs'
import * as uuid from "uuid"
export enum FileType {
    AUDIO = "audio",
    IMAGE = "image"
}

@Injectable()
export class FileService {
    createFile(type: FileType, file): string {
        try {
            const fileExtension = file.originalname.split(".").pop()
            const filename = uuid.v4() + "." + fileExtension
            const filePath = path.resolve(__dirname, "..", "static", type)
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.resolve(filePath, filename), file.buffer)
            return type + "/" + filename
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    removeFile(fileName) { 
        const filePath = path.resolve(__dirname, "..", "static", fileName)
        fs.rm(filePath,()=>{
            console.log("removed sucsesfully")
        })
    }
}