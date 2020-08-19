/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @author
 * jonathan.borges@mmbit.com.br
 * @ignore
 */

define([
  "accUtils",
  "knockout",
  "ojs/ojarraydataprovider",
  "jquery",
  "ojs/ojknockout",
  "ojs/ojlistview",
  "ojs/ojinputtext",
], function (accUtils, ko, ArrayDataProvider, $) {
  function DashboardDemo1ViewModel() {
    var self = this;

    self.filter = ko.observable("");
    self.data = ko.observableArray([]);
    self.dataFiltered = ko.observableArray([]);
    self.dataProvider = new ArrayDataProvider(self.dataFiltered, {
      keyAttributes: "id",
    });

    ko.computed(function () {
      self.dataFiltered(
        ko.utils.arrayFilter(self.data(), function (item) {
          return item.includes(self.filter());
        })
      );
    }, self);

    $.get(
      "https://static.oracle.com/cdn/fnd/gallery/2010.0.0/images/iconfont/ojuxIconFont.css"
    ).then(function (data) {
      const icons = data.match(/\.oj-ux-ico-[^ :]*/gi).map(function (value) {
        return value.substr(1);
      });
      self.data(icons);
    });

    self.connected = function () {
      accUtils.announce("Dashboard page loaded.", "assertive");
      document.title = "Dashboard";
    };

    self.disconnected = function () {};

    self.transitionCompleted = function () {};
  }

  return DashboardDemo1ViewModel;
});
