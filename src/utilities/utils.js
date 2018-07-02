"use strict";

const contentTypes = {
    PHOTO: "PHOTO",
    VIDEO: "VIDEO"
};

const imageSizes = {
    SMALL: "_t",
    BIG: "_b",
    ORIGINAL: "_o",
};

class Utils {

    static getParameterByName(name, url, decodeUri) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");// eslint-disable-line no-useless-escape
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        var res = results[2].replace(/\+/g, " ");
        if (decodeUri) {
            return decodeURIComponent(res);
        }
        return res;
    }

    static _getSmallThumb(thumbs, def) {
        for (let i in thumbs) {
            let thumb = thumbs[i].node;
            if (this._isSmallThumb(thumb)) return thumb;
        }
        return def;
    }

    static _getSrc(thumbs, def) {
        for (let i in thumbs) {
            let thumb = thumbs[i].node;
            if (this._isBigThumb(thumb)) return thumb.src;
        }
        return def;
    }

    static _isSmallThumb(thumb) {
        if (thumb.src.split("/").pop().split(".")[0].endsWith(imageSizes.SMALL)) {
            return true;
        }
        return thumb.height <= 300 || thumb.width <= 300;
    }

    static _isBigThumb(thumb) {
        if (thumb.src.split("/").pop().split(".")[0].endsWith(imageSizes.BIG)) {
            return true;
        }
        return thumb.height === 1024 || thumb.width === 1024;
    }

    static _toExifOrientation(degrees) {
        let orientation;
        switch(degrees) {
        case 90:
            orientation = 8;
            break;
        case 180:
            orientation = 3;
            break;
        case 270:
            orientation = 6;
            break;
        default:
            orientation = 0;
            break;
        }
        return orientation;
    }

    static graphQlToObj(allItems) {
        let res = [];
        allItems.edges.forEach(el => {
            let node = el.node;
            let item = {};
            item.src = this._getSrc(node.thumbsByItemId.edges, node.src);
            item.caption = node.caption;

            let thumb = this._getSmallThumb(node.thumbsByItemId.edges, node.thumbsByItemId.edges[0].node);
            item.thumbnail = thumb.src;
            item.thumbnailWidth = thumb.width;
            item.thumbnailHeight = thumb.height;
            item.tags = [];
            item.type = node.contentType;

            const isVideo = item.type === contentTypes.VIDEO;
            if (isVideo) {
                item.videoSrc = node.src;
                item.tags.push({
                    title: "video",
                    value: "video"
                });
            }

            node.itemTagsByItemId.edges.forEach(tag => {
                item.tags.push({
                    title: tag.node.tagByTagId.key,
                    value: tag.node.tagByTagId.val
                });
            });
            res.push(item);
        });
        return res;
    }

    static getDefaultPhotos() {
        return [
            {
                src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 174,
                tags: [{value: "Nature", title: "Nature"}, {value: "Flora", title: "Flora"}],
                caption: "After Rain (Jeshu John - designerspics.com)"
            },
            {
                src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
                thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                caption: "Boats (Jeshu John - designerspics.com)"
            },
            {
                src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                caption: "Color Pencils (Jeshu John - designerspics.com)"
            },
            {
                src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
                thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
            },
            {
                src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
                thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 183,
                caption: "37H (gratispgraphy.com)"
            },
            {
                src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
                thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
                thumbnailWidth: 240,
                thumbnailHeight: 320,
                tags: [{value: "Nature", title: "Nature"}],
                caption: "8H (gratisography.com)"
            },
            {
                src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
                thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 190,
                caption: "286H (gratisography.com)"
            },
            {
                src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
                thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 148,
                tags: [{value: "People", title: "People"}],
                caption: "315H (gratisography.com)"
            },
            {
                src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
                thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                caption: "201H (gratisography.com)"
            },
            {
                src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
                alt: "Big Ben - London",
                thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
                thumbnailWidth: 248,
                thumbnailHeight: 320,
                caption: "Big Ben (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
                alt: "Red Zone - Paris",
                thumbnail: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 113,
                tags: [{value: "People", title: "People"}],
                caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
                alt: "Wood Glass",
                thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
                thumbnailWidth: 313,
                thumbnailHeight: 320,
                caption: "Wood Glass (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
                thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
                thumbnail: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 194,
                caption: "Old Barn (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
                alt: "Cosmos Flower",
                thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                caption: "Cosmos Flower Macro (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
                thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
                thumbnailWidth: 271,
                thumbnailHeight: 320,
                caption: "Orange Macro (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
                thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                tags: [{value: "Nature", title: "Nature"}, {value: "People", title: "People"}],
                caption: "Surfer Sunset (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
                thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                tags: [{value: "People", title: "People"}, {value: "Sport", title: "Sport"}],
                caption: "Man on BMX (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
                thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
                thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                caption: "Time to Think (Tom Eversley - isorepublic.com)"
            },
            {
                src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
                thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 179,
                tags: [{value: "Nature", title: "Nature"}, {value: "Fauna", title: "Fauna"}],
                caption: "Untitled (Jan Vasek - jeshoots.com)"
            },
            {
                src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
                thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 215,
                tags: [{value: "People", title: "People"}],
                caption: "Untitled (moveast.me)"
            },
            {
                src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
                thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
                thumbnailWidth: 257,
                thumbnailHeight: 320,
                caption: "A photo by 贝莉儿 NG. (unsplash.com)"
            },
            {
                src: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
                thumbnail: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_n.jpg",
                thumbnailWidth: 226,
                thumbnailHeight: 320,
                caption: "A photo by Matthew Wiebe. (unsplash.com)"
            }
        ];
    }
}

export default Utils;
