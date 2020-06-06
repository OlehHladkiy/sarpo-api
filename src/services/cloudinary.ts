import cloudinary from 'cloudinary';

export default class CloudinaryService {
  /**
   * Upload file.
   */
  public static uploadFile = async (path: string, friendlyName: string) => {
    const res: any = await new Promise(resolve => {
      cloudinary.v2.uploader.upload(
        path,
        { resource_type: 'raw' },
        (_: any, result: any) => {
          resolve(result);
        },
      );
    });

    return { ...res, friendlyName };
  };

  /**
   * Destroy file.
   */
  public static destroyFile = async (id: string) => {
    const res = await new Promise(resolve => {
      cloudinary.v2.uploader.destroy(id, (_: any, result: any) => {
        resolve(result);
      });
    });

    return res;
  };
}
