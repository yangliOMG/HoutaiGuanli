/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-20 15:25:22
 */
import React from 'react';
import FileUpload from './FileUpload.jsx'

class FileUploader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: res=>{
                this.props.onSuccess(res.data)
            },
            uploadError: err=>{
                this.props.onError(err.message || '上传出错')
            }
        }
        return (
            <FileUpload options={options}>
                <button className="btn btn-default btn-xs" ref="chooseAndUpload">选择图片</button>
            </FileUpload>
        )	        
    }
}

export default FileUploader;