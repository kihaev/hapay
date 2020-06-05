import { SizeViewModel } from '.'

export class FileViewModel {
    public name: string
    public guid: string
    public size: SizeViewModel
    public creationDate: Date
    public expirationDate: Date
}