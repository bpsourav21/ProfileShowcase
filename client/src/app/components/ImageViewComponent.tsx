import React from "react";
import { PictureDto } from "../dtos/profile";
import { UPLOAD_ENDPOINT } from "../service/apiService";

interface Props {
    label?: string;
    picture: PictureDto | null;
    height?: number;
    bgColor?: string;
    showBorder?: boolean;
}

const ImageViewComponent = (props: Props) => {
    let label = props.label ? props.label : "No Image";
    let picture = props.picture ? props.picture : null;
    let imageBlock = <h6>{label}</h6>;
    let bgColor = props.bgColor || "transparent";
    if (picture) {
        imageBlock = <img src={UPLOAD_ENDPOINT + picture.imageName} />
    }

    return (
        <div className="image-block"
            style={{
                backgroundColor: bgColor,
                height: props.height,
                borderWidth: props.showBorder ? 1 : 0
            }}>
            {imageBlock}
        </div>
    )
}

export default ImageViewComponent;

