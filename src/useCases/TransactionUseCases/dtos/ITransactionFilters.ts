export interface ITransactionFiltersDTO {
    id_user?: number;
    cpf?: string;
    description: string;
    status: string;
    startDate: Date;
    endDate: Date;
}