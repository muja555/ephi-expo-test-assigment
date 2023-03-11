import {BASE_URL} from "core/constants/http.constant";
import {IUser} from "modules/user/types/user.type";

export class UserEphiIdUpdate {

    public user_id: number | null = null;
    public ephi_id: number | null = null;

    public async send(): Promise<IUser> {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ephi_id: this.ephi_id,
            })
        };


        const response = await fetch(`${BASE_URL}/users/${this.user_id}/ephi`, requestOptions);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    }

}



export default UserEphiIdUpdate;
