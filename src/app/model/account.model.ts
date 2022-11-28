export interface AccountDetails {
    accountId: string;
    balance: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    accountOperationsDTO: accountOperationsDTO[];
}

export interface accountOperationsDTO {
    id: number;
    operationDate: Date;
    amount: number;
    type: string;
    description: string;
}

export interface Account {
    id: string;
    createdAt : Date;
    balance: number;
    status : string
}
