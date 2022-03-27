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
        TriggerClientEvent('Roda_ReportSystem:OpenAdminUi', src, data)
    else
        print('ckt')
    end
end)

RegisterServerEvent('Roda_ReportSystem:SaveData')
AddEventHandler('Roda_ReportSystem:SaveData', function (data)
    SaveReport(data)
end)