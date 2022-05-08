// klient odesílá name:"hlas" a value:číslo písmena a odesílá sériové číslo
// klient má na začátku zablokované hlasování a čeká na povolení od serveru to vidí na displeji pomocí ikon NO a YES
// pokud server zprávu přijme zobrazí se klientovi ikona HEART
// ---ovládání---
// tlačítko A rotuje volbami pospátku
// tlačítko B rotuje volbami podle abecedy
// tlačítko logo odesílá volbu
radio.setTransmitSerialNumber(true)
radio.setGroup(1)
let value = 65
let key = false
basic.showString("?")
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    
    if (key == true) {
        radio.sendValue("hlas", value)
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    volba(65, 68, value - 1)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    volba(68, 65, value + 1)
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 1 && key == false) {
        lock(true, IconNames.Yes)
    } else if (receivedNumber == 0) {
        lock(false, IconNames.No)
    }
    
    if (receivedNumber == control.deviceSerialNumber()) {
        basic.clearScreen()
        basic.showIcon(IconNames.Heart)
    }
    
})
function volba(x: number, y: number, operace: number) {
    
    if (key == true) {
        if (value == x) {
            value = y
        } else {
            value = operace
        }
        
        basic.clearScreen()
        basic.showString(String.fromCharCode(value))
    }
    
}

function lock(stav: boolean, icon: number) {
    
    key = stav
    basic.clearScreen()
    basic.showIcon(icon)
}

