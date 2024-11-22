import axios, { AxiosRequestConfig } from "axios";
import { Endpoints } from "./ApiEndpoints";
import { DeviceModel } from "../domain/Device";
import { ResponseMapper } from "./ResponseMapper";

class AppiumService {
    baseUrl: string = "http://127.0.0.1:4723/device-farm/"

    constructor() {}

    public withBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl
    }
     
    async getDevices() {
        const endpoint = Endpoints["device-list"] ?? ""

        const requestConfig: AxiosRequestConfig = {
            baseURL: this.baseUrl,
            url: endpoint,
            method: "get"
        }

        return this.request(requestConfig)
        .then(result => {
            console.log(result.data)
            const devices: DeviceModel[] = result.data.map((items: any) => {
                return {
                    udid: items.udid,
                    sdk: items.sdk,
                    systemPort: items.systemPort,
                    name: items.name,
                    busy: items.busy,
                    host: items.host
                }
            })
            return devices
        })
    }

    createAppiumSession(device: DeviceModel) {
        const endpoint = Endpoints["create-session"] ?? ""
        const body = {
            "udid": device.udid,
            "systemPort": device.systemPort,
            "origin":"http://127.0.0.1:3000"
        }

        const requestConfig: AxiosRequestConfig = {
            baseURL: this.baseUrl,
            url: endpoint,
            data : body,
            method: "post"
        }

        return this.request(requestConfig)
    }

    async blockDevice() {

    }

    public connectDevice(device: DeviceModel) {
        let deviceHost = device.host.replaceAll("http://", "")
        const socket = new WebSocket(`ws://${deviceHost}/android-stream/${device.udid}`)
        return socket
    }

    private async request(config: AxiosRequestConfig) {
        return axios.request(config)
        .then(result => {
            console.log(`${config.url} ${result}`)
            return result
        })
    }
}

export const appiumService = new AppiumService()