import {BASE_URL} from "core/constants/http.constant";
import {IEphi} from "modules/ephi/types/ephi.type";

export class EphiUpdateRequest {

    public ephi_id: number | null = null;
    public first_name: string | null = null;
    public last_name: string | null = null;
    public address: string | null = null;
    public birthday: Date | null = null;
    public phone: string | null = null;
    public email: string | null = null;
    public ssn: number | null = null; // Social Security Number
    public mrn: number | null = null; // Medical Record Number
    public health_plan: number | null = null; // Health plan beneficiary numbers


    public async send(): Promise<IEphi> {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: this.first_name,
                last_name: this.last_name,
                address: this.address,
                birthday: this.birthday,
                phone: this.phone,
                email: this.email,
                ssn: this.ssn,
                mrn: this.mrn,
                health_plan: this.health_plan,
            })
        };


        const response = await fetch(`${BASE_URL}/ephi/${this.ephi_id}`, requestOptions);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    }

}



export default EphiUpdateRequest;
