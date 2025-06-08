interface IObject {
  [key: string]: string | number;
}

export type FormValues = {
  [key: string]: string | string[] | File[] | FileList;
};

export default IObject;
