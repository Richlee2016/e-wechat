// 文件类型
export interface FileType {
    fieldname: string;
    filename: string;
    encoding: string;
    mimeType: string;
    buffer: Buffer | string;
    length: number;
}

// 获取素材列表参数
export interface MatterList {
    token: string;
    page?: number;
    count?: number;
    type?: boolean;
}

// 创建素材
export interface CreateMaterial {
    token: string;
    file: FileType;
    type: boolean;
    description?: {
        title: string,
        introduction: string
    };

}

// 修改图文素材
export interface MatterNews {
    media_id: string;
    index: number; // 要更新的文章在图文消息中的位置（多图文消息时，此字段才有意义），第一篇为0
    articles: NewsType;
}

// 图文素材
export interface NewsType {
    title: string;
    thumb_media_id: string; // 图文消息的封面图片素材id（必须是永久mediaID）
    author: string;
    digest: string; // 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
    show_cover_pic: number; // 是否显示封面，0为false，即不显示，1为true，即显示
    content: string;
    content_source_url: string;
}