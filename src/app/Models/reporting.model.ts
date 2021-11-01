export class Reporting {
    location: string;
    date: string;
    capacity: string;
    actualBookings: string;
    cancelledBookings: string
    completedBookings: string;
    positveCases: string;
    negativeCases: string;

    clear() {
        this.location = "";
        this.date = "";
        this.capacity = "";        
        this.actualBookings = "";
        this.cancelledBookings = "";
        this.completedBookings = "";
        this.positveCases = "";
        this.negativeCases = "";
    }
}
