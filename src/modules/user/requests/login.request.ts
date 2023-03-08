import {IUser} from "modules/user/types/user.type";
import {BASE_URL} from "core/constants/http.constant";

export class LoginRequest {

    public username: string | null = null;
    public password: string | null = null;

    public async send(): Promise<IUser> {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.username,
                password: this.password,
            })
        };

        const response = await fetch(`${BASE_URL}/users/login`, requestOptions);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    }

}

export default LoginRequest;
