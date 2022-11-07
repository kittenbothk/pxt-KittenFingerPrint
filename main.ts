namespace KittenFingerPrint {

let read = pins.createBuffer(14)
let _touch = DigitalPin.P16

    function searchfinger() {
		let cmd_search = pins.createBuffer(12)
		cmd_search[0] = 239
		cmd_search[1] = 1
		cmd_search[2] = 255
		cmd_search[3] = 255
		cmd_search[4] = 255
		cmd_search[5] = 255
		cmd_search[6] = 1
		cmd_search[7] = 0
		cmd_search[8] = 3
		cmd_search[9] = 1
		cmd_search[10] = 0
		cmd_search[11] = 5
		serial.writeBuffer(cmd_search)
		read = serial.readBuffer(12)
		basic.pause(200)
		while (convertToText(read[9]) == "2") {
			let cmd_search = pins.createBuffer(12)
			cmd_search[0] = 239
			cmd_search[1] = 1
			cmd_search[2] = 255
			cmd_search[3] = 255
			cmd_search[4] = 255
			cmd_search[5] = 255
			cmd_search[6] = 1
			cmd_search[7] = 0
			cmd_search[8] = 3
			cmd_search[9] = 1
			cmd_search[10] = 0
			cmd_search[11] = 5
			serial.writeBuffer(cmd_search)
			read = serial.readBuffer(12)
			basic.pause(200)
		}
    }


    //% blockId= init_KittenFinger block="Fingerprint Init at pin RX(Blue) %txpin TX(Yellow) %rxpin Touch(Green) %touchpin"
    //% weight=20
    export function initKittenFinger(txpin: SerialPin, rxpin: SerialPin, touchpin: DigitalPin): void {
        _touch=touchpin
		serial.redirect(txpin,rxpin,BaudRate.BaudRate57600)
		basic.pause(2000)
		let link = pins.createBuffer(16)
		link[0] = 239
		link[1] = 1
		link[2] = 255
		link[3] = 255
		link[4] = 255
		link[5] = 255
		link[6] = 1
		link[7] = 0
		link[8] = 7
		link[9] = 19
		link[10] = 0
		link[11] = 0
		link[12] = 0
		link[13] = 0
		link[14] = 0
		link[15] = 27
		serial.writeBuffer(link)
		read = serial.readBuffer(12)
		basic.pause(200)
		let readflash = pins.createBuffer(12)
		readflash[0] = 239
		readflash[1] = 1
		readflash[2] = 255
		readflash[3] = 255
		readflash[4] = 255
		readflash[5] = 255
		readflash[6] = 1
		readflash[7] = 0
		readflash[8] = 3
		readflash[9] = 22
		readflash[10] = 0
		readflash[11] = 26
		serial.writeBuffer(readflash)
		read = serial.readBuffer(12)
		basic.pause(200)
		let readmould = pins.createBuffer(12)
		readmould[0] = 239
		readmould[1] = 1
		readmould[2] = 255
		readmould[3] = 255
		readmould[4] = 255
		readmould[5] = 255
		readmould[6] = 1
		readmould[7] = 0
		readmould[8] = 3
		readmould[9] = 29
		readmould[10] = 0
		readmould[11] = 33
		serial.writeBuffer(readmould)
		read = serial.readBuffer(20)
		read = serial.readBuffer(14)
		basic.pause(200)
    }

    //% blockId= Finger_touch block="Touch Sensor"
    //% weight=17
    export function fingertouch(): boolean{
        if (pins.digitalReadPin(_touch) == 1){
        return true
        } else {
        return false
        }
    }

    //% blockId= Finger_search block="Finger search"
    //% weight=15
    export function fingersearch(): string {
		searchfinger()
		let cmd_gen1 = pins.createBuffer(13)
		cmd_gen1[0] = 239
		cmd_gen1[1] = 1
		cmd_gen1[2] = 255
		cmd_gen1[3] = 255
		cmd_gen1[4] = 255
		cmd_gen1[5] = 255
		cmd_gen1[6] = 1
		cmd_gen1[7] = 0
		cmd_gen1[8] = 4
		cmd_gen1[9] = 2
		cmd_gen1[10] = 1
		cmd_gen1[11] = 0
		cmd_gen1[12] = 8
		serial.writeBuffer(cmd_gen1)
		read = serial.readBuffer(12)
		basic.pause(200)
		let cmd_dis = pins.createBuffer(17)
		cmd_dis[0] = 239
		cmd_dis[1] = 1
		cmd_dis[2] = 255
		cmd_dis[3] = 255
		cmd_dis[4] = 255
		cmd_dis[5] = 255
		cmd_dis[6] = 1
		cmd_dis[7] = 0
		cmd_dis[8] = 8
		cmd_dis[9] = 4
		cmd_dis[10] = 1
		cmd_dis[11] = 0
		cmd_dis[12] = 0
		cmd_dis[13] = 1
		cmd_dis[14] = 0x2C
		cmd_dis[15] = 0
		cmd_dis[16] = 0x3B
		serial.writeBuffer(cmd_dis)
		read = serial.readBuffer(16)
		basic.pause(200)
		if ((read[13]) > 20){
			basic.pause(200)
			return convertToText(read[11])
		}
		else
			return "No Match"
    }

    //% blockId= Finger_wait block="Wait finger out"
    //% weight=14
	export function waitfinger (): void {
		let cmd_search = pins.createBuffer(12)
		cmd_search[0] = 239
		cmd_search[1] = 1
		cmd_search[2] = 255
		cmd_search[3] = 255
		cmd_search[4] = 255
		cmd_search[5] = 255
		cmd_search[6] = 1
		cmd_search[7] = 0
		cmd_search[8] = 3
		cmd_search[9] = 1
		cmd_search[10] = 0
		cmd_search[11] = 5
		serial.writeBuffer(cmd_search)
		read = serial.readBuffer(12)
		basic.pause(200)
		while (convertToText(read[9]) != "2") {
			let cmd_search = pins.createBuffer(12)
			cmd_search[0] = 239
			cmd_search[1] = 1
			cmd_search[2] = 255
			cmd_search[3] = 255
			cmd_search[4] = 255
			cmd_search[5] = 255
			cmd_search[6] = 1
			cmd_search[7] = 0
			cmd_search[8] = 3
			cmd_search[9] = 1
			cmd_search[10] = 0
			cmd_search[11] = 5
			serial.writeBuffer(cmd_search)
			read = serial.readBuffer(12)
			basic.pause(200)
		}
	}

    //% blockId= Finger_save block="Save finger at|ID %value"
    //% weight=10
	export function savefinger (value: number): boolean {
		searchfinger()
		let cmd_gen1 = pins.createBuffer(13)
		cmd_gen1[0] = 239
		cmd_gen1[1] = 1
		cmd_gen1[2] = 255
		cmd_gen1[3] = 255
		cmd_gen1[4] = 255
		cmd_gen1[5] = 255
		cmd_gen1[6] = 1
		cmd_gen1[7] = 0
		cmd_gen1[8] = 4
		cmd_gen1[9] = 2
		cmd_gen1[10] = 1
		cmd_gen1[11] = 0
		cmd_gen1[12] = 8
		serial.writeBuffer(cmd_gen1)
		read = serial.readBuffer(12)
		basic.pause(500)
		searchfinger()
		let cmd_gen2 = pins.createBuffer(13)
		cmd_gen2[0] = 239
		cmd_gen2[1] = 1
		cmd_gen2[2] = 255
		cmd_gen2[3] = 255
		cmd_gen2[4] = 255
		cmd_gen2[5] = 255
		cmd_gen2[6] = 1
		cmd_gen2[7] = 0
		cmd_gen2[8] = 4
		cmd_gen2[9] = 2
		cmd_gen2[10] = 2
		cmd_gen2[11] = 0
		cmd_gen2[12] = 9
		serial.writeBuffer(cmd_gen2)
		read = serial.readBuffer(12)
		basic.pause(200)
		let cmd_reg = pins.createBuffer(12)
		cmd_reg[0] = 239
		cmd_reg[1] = 1
		cmd_reg[2] = 255
		cmd_reg[3] = 255
		cmd_reg[4] = 255
		cmd_reg[5] = 255
		cmd_reg[6] = 1
		cmd_reg[7] = 0
		cmd_reg[8] = 3
		cmd_reg[9] = 5
		cmd_reg[10] = 0
		cmd_reg[11] = 9
		serial.writeBuffer(cmd_reg)
		read = serial.readBuffer(12)
		basic.pause(200)
		let cmd_save = pins.createBuffer(15)
		cmd_save[0] = 239
		cmd_save[1] = 1
		cmd_save[2] = 255
		cmd_save[3] = 255
		cmd_save[4] = 255
		cmd_save[5] = 255
		cmd_save[6] = 1
		cmd_save[7] = 0
		cmd_save[8] = 6
		cmd_save[9] = 6
		cmd_save[10] = 1
		cmd_save[11] = 0
		cmd_save[12] = value
		cmd_save[13] = 0
		cmd_save[14] = cmd_save[12]+14
		serial.writeBuffer(cmd_save)
		read = serial.readBuffer(12)
		basic.pause(200)
		if (convertToText(read[11]) == "10")
			return true
		else
			return false
	}

    //% blockId= Finger_delete block="Delete finger at|ID %value"
    //% weight=5
	export function deletefinger (value: number): boolean {
		let cmd_deletchar = pins.createBuffer(16)
		cmd_deletchar[0] = 239
		cmd_deletchar[1] = 1
		cmd_deletchar[2] = 255
		cmd_deletchar[3] = 255
		cmd_deletchar[4] = 255
		cmd_deletchar[5] = 255
		cmd_deletchar[6] = 1
		cmd_deletchar[7] = 0
		cmd_deletchar[8] = 7
		cmd_deletchar[9] = 0x0c
		cmd_deletchar[10] = 0
		cmd_deletchar[11] = value
		cmd_deletchar[12] = 0
		cmd_deletchar[13] = 1
		cmd_deletchar[14] = 0
		cmd_deletchar[15] = 21+value
		serial.writeBuffer(cmd_deletchar)
		read = serial.readBuffer(12)
		basic.pause(200)
		if (convertToText(read[11]) == "10")
			return true
		else
			return false
    }

}