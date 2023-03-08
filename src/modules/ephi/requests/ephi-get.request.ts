import {BASE_URL} from "core/constants/http.constant";
import {IEphi} from "modules/ephi/types/ephi.type";

export class EphiGetRequest {

    public ephi_id: number | null = null;

    public async send(): Promise<IEphi> {

        const response = await fetch(`${BASE_URL}/ephi/${this.ephi_id}`);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    }

}



export default EphiGetRequest;
