#klient odesílá name:"hlas" a value:číslo písmena a odesílá sériové číslo
#klient má na začátku zablokované hlasování a čeká na povolení od serveru to vidí na displeji pomocí ikon NO a YES
#pokud server zprávu přijme zobrazí se klientovi ikona HEART

#---ovládání---
#tlačítko A rotuje volbami pospátku
#tlačítko B rotuje volbami podle abecedy
#tlačítko logo odesílá volbu

radio.set_transmit_serial_number(True)
radio.set_group(1)
value=65
key=False
basic.show_string("?")
def on_logo_event_pressed():
    global key
    if key==True:
        radio.send_value("hlas", value)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_event_pressed)

def on_button_pressed_a():
    volba(65,68,value-1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    volba(68,65,value+1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_number(receivedNumber):
    global key
    if receivedNumber==1 and key==False:
        lock(True,IconNames.YES)
    elif receivedNumber==0:
        lock(False,IconNames.NO)
    if receivedNumber==control.device_serial_number():
        basic.clear_screen()
        basic.show_icon(IconNames.HEART)
radio.on_received_number(on_received_number)

def volba(x,y,operace):
    global value,key
    if key==True:
        if value==x:
            value=y
        else:
            value = operace
        basic.clear_screen()
        basic.show_string(String.from_char_code(value))

def lock(stav,icon):
    global key
    key=stav
    basic.clear_screen()
    basic.show_icon(icon)