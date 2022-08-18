import React from "react";
import { PictureDto } from "../dtos/profile";
import apiService from "../service/apiService";
import ImageViewComponent from "./ImageViewComponent";

type UploadPicture = string | ArrayBuffer | null;
interface Props {
    label?: string;
    onUploadImage: (picture: PictureDto) => void;
    picture: PictureDto | null;
}

const convertBase64 = (file: any): Promise<UploadPicture> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const ImageUploaderComponent = (props: Props) => {
    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append("picture", file);
            apiService
                .post(`/uploadImage/`, formData)
                .then((res) => {
                    const data: PictureDto = res.data;
                    props.onUploadImage(data);
                })
                .catch(e => {
                })
        }
    };

    return (
        <div className="imageUpload">
            <ImageViewComponent
                picture={props.picture}
                label={props.label}
                height={100}
                bgColor={"#fff"}
                showBorder={true}
            />
            <div className="mb-3"></div>
            <input
                type="file"
                className="form-control-file"
                name="profilePicture"
                onChange={(e) => uploadImage(e)}
            />
        </div>
    )
}

export default ImageUploaderComponent;

