param location string = resourceGroup().location
param appServiceName string = 'thinkalike'
param containerRegistry string
param dockerImageName string
param dockerImageTag string

@allowed([
  'staging'
  'prod'
])
param environment string

var dockerImage = '${containerRegistry}/${dockerImageName}:${dockerImageTag}'
var appServiceTier = environment == 'staging' ? 'F1' : 'B1'

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: toLower('${appServiceName}-asp')
  location: location
  kind: 'linux'
  sku: {
    name: appServiceTier
  }
  properties: {
    reserved: true
  }
}

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: '${appServiceName}-app'
  location: location
  kind: 'app,linux,container'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${dockerImage}'
    }
  }
}
