function SdnAutocomplete($module) {
    this.$module = $module

    this.onChangeHandlers = {};
}

SdnAutocomplete.prototype.setOnChange = function (element, handler) {
    this.onChangeHandlers[element] = handler;
}

SdnAutocomplete.prototype.init = function (settings) {
    var id = settings.element;
    var name = settings.name;
    var desiredField = settings.returnField;
    var searchField = settings.searchField;
    var data = settings.data;

    var searchData = [];
    // inherited
    //forEach?
    for (var i = 0; i < data.length; i++) {
        var dataObj = data[i][searchField];
        searchData.push(dataObj);
    }

    this.onChangeHandlers[id] = function () { };
    settings.onConfirm = this.onChangeHandlers[id];

    accessibleAutocomplete({
        element: document.getElementById(id + "-autocomplete-container"),
        id: id,
        displayMenu: "overlay",
        showAllValues: true,
        confirmOnBlur: false,
        autoselect: true,
        dropdownArrow: function (config) {
            return '<svg class="' + config.className + '" style ="top: 8px;" viewBox="0 0 512 512"> <path d="M256,298.3L256, 298.3L256, 298.3l174.2 - 167.2c4.3 - 4.2, 11.4 - 4.1, 15.8, 0.2l30.6, 29.9c4.4, 4.3, 4.5, 11.3, 0.2, 15.5L264.1, 380.9  c - 2.2, 2.2 - 5.2, 3.2 - 8.1, 3c - 3, 0.1 - 5.9 - 0.9 - 8.1 - 3L35.2, 176.7c - 4.3 - 4.2 - 4.2 - 11.2, 0.2 - 15.5L66, 131.3c4.4 - 4.3, 11.5 - 4.4, 15.8 - 0.2L256, 298.3  z"/></svg >'
        },
        tNoResults: function () {
            return settings.noResultText;
        },
        source: function (query, populateResults) {
            // inherited
            var results = []
            var localResult = []

            if (query === '') {
                results = searchData
            }
            else {
                var term = replaceDiacritics(query).toLowerCase()

                searchData.forEach(function (element) {
                    var localised = replaceDiacritics(element).toLowerCase();
                    localResult.push(localised);
                });
                localResult.filter(function (result) {
                    var exists = result.indexOf(term);
                    if (exists !== -1) {
                        var index = localResult.indexOf(result);
                        results.push(searchData[index]);
                    }
                });

                results = results.sort(function (a, b) {
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0))
                });
            }
            populateResults(results);

        },
        onConfirm: function () {

            var returnField = document.querySelector('[name="' + name + '"]');
            var selectedValue = document.getElementById(id).value;

            for (var i = 0; i < data.length; i++) {
                if (data[i][searchField] === selectedValue) {
                    if (desiredField) {
                        returnField.value = data[i][desiredField];
                    }
                    else {
                        returnField.value = data[i];
                    }
                    break;
                }


            }

            //settings.onChange(selectedElement);
        }
    })
}

export default SdnAutocomplete
