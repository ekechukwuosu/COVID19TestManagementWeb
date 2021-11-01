export class BookingMaster {
    id: string;
    location: string;
    date: string;
    space: string;
    usedSpace: string

    clear() {
        this.id = "";
        this.location = "";
        this.date = "";
        this.space = "";
        this.usedSpace = "";
    }
}
