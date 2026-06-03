import Address from "../models/address";

interface AddressData {
    city: string;
    employeeId: number;
}

export async function getAllAddresses(): Promise<Address[]> {
    return await Address.findAll();
}

export async function createAddress(
    address: AddressData
): Promise<Address> {
    return await Address.create(address);
}