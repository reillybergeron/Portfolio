import ExifReader from 'exifreader';

export async function getPhotoMetadata(filePath: string): Promise<string | null> {
    try {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const tags = await ExifReader.load(arrayBuffer);
        
        const dateTime = tags.DateTimeOriginal?.description || tags.DateTime?.description;
        return dateTime || null;
    } catch (error) {
        console.error("Error reading metadata:", error);
        return null;
    }
}
