import * as viewsPage from '../../../support/page-objects/views/views.page'
import * as listViewPage from "../../../support/page-objects/views/itemsListPanel.page"
import * as genericActions from "../../../support/utils/genericActions/genericActions.page";
import { updateQSRTerminalNumber, verfifyQSRTerminalNumber } from '../../../support/page-objects/views/stations/stations.page';
import { getRandomNumberMaxN } from '../../../support/utils/data-generators/getRandomData';


const stationModule = "Stations"
const noGroupOption = "No Grouping"
const groupOption = "Location"
const multipleStations = ["Automation Station 2", "Automation Station 3"]

beforeEach(() => {
    viewsPage.navigateToSpecificModule(stationModule)
    listViewPage.clearSelectedViewsListItems()
})

describe('Station Action E2E Tests', () => {

    it('C1518757 C1518756: User can apply a No Group/ Group filter to Stations', () => {
        
        listViewPage.selectGroupingOption(noGroupOption)
        listViewPage.verifyItemGroupAvailability(noGroupOption)
        listViewPage.selectGroupingOption(groupOption)
        listViewPage.verifyItemGroupAvailability(groupOption)

    })

    it('C1458900: Read/ Update a Station', () => {
        
        listViewPage.selectSpecificViewItemFromList(multipleStations[0])
        genericActions.selectCheckbox("Test Station")
        genericActions.verifyCheckboxDeSelected("Test Station")
        genericActions.selectCheckbox("Test Station")
        genericActions.verifyCheckboxSelected("Test Station")
    })

    it('C1458901: Read many Stations', () => {
        
        listViewPage.filterUsingSpecificName("Automation Station")
        listViewPage.verifyMultipleFilteredList(multipleStations)
    })

    it('CC1567623: Search station by name', () => {
        
        listViewPage.filterUsingSpecificName(multipleStations[0])
        listViewPage.verifyFilteredList(multipleStations[0])
    })
    it('C1458902: Update many Stations', () => {
        
        const num = getRandomNumberMaxN(9)
        listViewPage.selectMultipleViewItemsFromList(multipleStations)
        updateQSRTerminalNumber(num)
        listViewPage.selectNoneItems()
        listViewPage.selectSpecificViewItemFromList(multipleStations[0])
        verfifyQSRTerminalNumber(num)
        listViewPage.selectSpecificViewItemFromList(multipleStations[1])
        verfifyQSRTerminalNumber(num)

    })

    it('C1576189 C1576190: selects and deselects multiple stations', () => {
        // Selects all stations
        listViewPage.selectAllItems()
        listViewPage.verifyAllItemSelection()
        // Deselects all stations
        listViewPage.selectNoneItems()
        listViewPage.verifyAllItemsDeselection()
    })

})