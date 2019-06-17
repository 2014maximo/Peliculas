import { ActorModel } from './actor';

export class PeliculaModel {
    public id: number;
    public title: string;
    public poster_path: string;
    public overview: string;
    public genre_ids: string;
    public release_date: Date;
    public actor: ActorModel;

}