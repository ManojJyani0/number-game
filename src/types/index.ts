import { Dispatch, SetStateAction } from "react";

export interface ILoginCredential {
    mobile: string,
    password: string
}

export interface ISignUpCredential {
    name: string,
    mobile: number,
    password: string,
    confirmPassword: string,
}

export interface ISubmitOTP {
    sid: string|undefined
    OTP: string|undefined
}

export interface IUserInfo {
    _id:                 string;
    name:                string;
    mobile:              string;
    roleType:            string;
    accountVarification: boolean;
    amount:              number;
    winningCoins?:        number;
    status?:              string;

}


export interface IServerResponse<T> {
    success: boolean|undefined;
    data:    T;
}

export interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    userInfo: IUserInfo;
    setUserInfo: Dispatch<SetStateAction<IUserInfo>>;
    handleLogOut:any;
  }

  export type ICurrentGame = {
    _id:         string;
    contestId:   string;
    gameEndTime?: Date;
    status:      string;
    createdAt:   Date;
    updatedAt:   Date;
}
export type TransactionList = {
    UTR?:               string;
    amount:             number;
    status:             Status;
    transactionType:    TransactionType;
    createdAt:          Date;
    accountHolderName?: string;
    accountNumber?:     number;
    bankName?:          string;
    IFSC_code?:         string;
}

export type Status = "Success"|"Pending"|"Failed";

export type TransactionType = "Deposit" | "Withdrawal" | "JoinGame" | "PriceMoney";

export type LastGame = {
    contestId:      string;
    winningPrice?:  number;
    winningNumber?: number;
}
