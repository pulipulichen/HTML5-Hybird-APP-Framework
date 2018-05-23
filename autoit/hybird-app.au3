#include <MsgBoxConstants.au3>
#pragma compile(Icon, '../icon.ico')

Local $command = 'start /B hybird-app.exe electron-config.json'
RunWait(@ComSpec & " /c " & $command, "", @SW_HIDE)
;MsgBox($MB_SYSTEMMODAL, "", $command)