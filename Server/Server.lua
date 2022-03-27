RegisterCommand('reportmenu', function(source)
    local src = source 
    local name = src..' · '..GetPlayerName(src)
    TriggerClientEvent('Roda_ReportSystem:OpenUi', src, name)
end)

RegisterCommand('reportlist', function(source)
    local src = source
    local haveAccess = CheckIsAdmin(src)
    local data = GetReports()
    if haveAccess then 
        if  data ~= 'Fail' then 
            TriggerClientEvent('Roda_ReportSystem:OpenAdminUi', src, data)
        else
            TriggerClientEvent('Roda_ReportSystem:ShowNoti', src, 'Error', 'The Report List is Empty!', '#ff0000')
        end
    else
        TriggerClientEvent('Roda_ReportSystem:ShowNoti', src, 'Error', 'You are not admin!', '#ff0000')
    end
end)

RegisterServerEvent('Roda_ReportSystem:SaveData')
AddEventHandler('Roda_ReportSystem:SaveData', function (data)
    local src = source
    SaveReport(data)
    NoticiationForAllAdmins(src)
    SendRodaLog('New Report!', 'red', '**From:** \n ``` '..src..' · '..GetPlayerName(src)..' ``` \n **Type: ** \n ``` '..data.type..' ``` \n **Title:** \n ``` '..data.titulo..' ``` \n **Description:** \n ``` '..data.descripcion..' ``` \n **Player Reported: ** \n ``` '..data.targetid..' ``` \n ', data.picture)
end)


RegisterServerEvent('Roda_ReportSystem:UpdateReport')
AddEventHandler('Roda_ReportSystem:UpdateReport', function (reportid)
    local src = source
    UpdateReport(reportid)
    SendRodaLog('Report Solved!', 'green', '**Admin:** \n ``` '..src..' · '..GetPlayerName(src)..' ``` \n **Report ID ** \n ``` '..reportid..' ``` ', 'http://pa1.narvii.com/5747/0511ca664aafbde2df6db962257c3e660b17dee4_00.gif')
end)


RegisterServerEvent('Roda_ReportSystem:RequestReport')
AddEventHandler('Roda_ReportSystem:RequestReport', function (reportid)
    local src = source
    local data = GetReportData(reportid)
    TriggerClientEvent('Roda_ReportSystem:SetDataReport', src, data)
end)