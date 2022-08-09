import classNames from "classnames";
import { useState } from "react";
import { Picture } from "../dtos/profile";

interface Props {
    label?: string;
    onUploadImage: (imgSrc: Picture) => void;
}

const convertBase64 = (file: any): Promise<Picture> => {
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
    let [imgSrc, updateImage] = useState(null as Picture);

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const base64 = await convertBase64(file);
            updateImage(base64);
            props.onUploadImage(base64);
        }
        else {
            updateImage(null);
            props.onUploadImage(null);
        }
    };

    let label = props.label ? props.label : "Please Upload image";
    let imageBlock = <h6>{label}</h6>;
    let bgColor = "#fff";
    if (typeof (imgSrc) === 'string') {
        imageBlock = <img src={imgSrc} />
        bgColor = "#eee";
    }

    return (
        <div className="imageUpload">
            <div className="image-block"
                style={{
                    backgroundColor: bgColor
                }}>
                {imageBlock}
            </div>
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

