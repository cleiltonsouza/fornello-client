import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class PersonaTemplateService {

    public async recuperaTemplate(){


        let parameters: IHttpClientRequestParameters
            = {
                url: `http://localhost:3000/persona-template/template`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.data;

        } catch (error) {
            return null
        }
    }
}