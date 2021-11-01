export class BookingInformation {
    id: string;
    firstName: string;
    lastName: string;
    location: string;
    testType: string
    bookingDate: string;
    cancelledStatus: string;
    result: string;
    resultDate: string
    createDate: string

    clear() {
        this.id = "";
        this.firstName = "";
        this.lastName = "";        
        this.location = "";
        this.testType = "";
        this.bookingDate = "";
        this.cancelledStatus = "";
        this.result = "";
        this.resultDate = "";
        this.createDate = "";
    }
}

