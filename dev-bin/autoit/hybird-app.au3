#include <MsgBoxConstants.au3>
#pragma compile(Icon, '../../icon.ico')

FileChangeDir(@ScriptDir & "/hybird-app-win32-x64/")

Local $command = 'start /B hybird-app.exe electron-config.json'
RunWait(@ComSpec & " /c " & $command, "", @SW_HIDE)
;MsgBox($MB_SYSTEMMODAL, "", $command)