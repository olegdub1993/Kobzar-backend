/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from "path"
import * as fs from 'fs'
import * as uuid from "uuid"
import { S3 } from 'aws-sdk';
export enum FileType {
    AUDIO = "audio",
    IMAGE = "image"
}

@Injectable()
export class FileService {
   async createFile(type: FileType, file): Promise<any> {
    try {
        const fileExtension = file.originalname.split(".").pop()
        const filename = uuid.v4() + "." + fileExtension
        const accessKeyId=process.env.AWS_ACCESS_KEY
        const secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY
        const region="eu-central-1"
        const bucketName="kobzar-s3-bucket"
        const s3=new S3({
            region,
            accessKeyId,
            secretAccessKey,
        })
        const uploadParams={
            Bucket:bucketName,
            Body:file.buffer,
            Key:type + "/" + filename
        }
        let s3Response=  await s3.upload(uploadParams).promise();
        return [type + "/" + filename, s3Response.Location]
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        // in case of saving files on server
        // try {
        //     const fileExtension = file.originalname.split(".").pop()
        //     const filename = uuid.v4() + "." + fileExtension
        //     const filePath = path.resolve(__dirname, "..", "static", )
        //     if (!fs.existsSync(filePath)) {
        //         fs.mkdirSync(filePath, { recursive: true })
        //     }
        //     fs.writeFileSync(path.resolve(filePath, filename), file.buffer)
        //     return type + "/" + filename
        // } catch (error) {
        //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        // }
    }
    async  removeFile(fileName) {
        const accessKeyId=process.env.AWS_ACCESS_KEY
        const secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY
        const region="eu-central-1"
        const bucketName="kobzar-s3-bucket" 
        const s3=new S3({
            region,
            accessKeyId,
            secretAccessKey,
        })
        const deleteParams={
            Bucket:bucketName,
            Key: fileName
        }
        let s3Response = await s3.deleteObject(deleteParams, function(err, data) {
            if (err) console.log(err, err.stack); 
            else     console.log(data);          
          });
    }
    // in case of deleting files from server
    // removeFile(fileName) { 
    //     const filePath = path.resolve(__dirname, "..", "static", fileName)
    //     fs.rm(filePath,()=>{
    //         console.log("removed sucsesfully")
    //     })
    // }
}