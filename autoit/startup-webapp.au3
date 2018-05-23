#include <MsgBoxConstants.au3>
#pragma compile(Icon, 'icon.ico')

Local $command = 'start /B webapp-wrapper.exe webapp-config.json'
RunWait(@ComSpec & " /c " & $command, "", @SW_HIDE)
;MsgBox($MB_SYSTEMMODAL, "", $command)