new Vue({
  el: '#app',

  methods: {
    onDrawerItem() {
      console.log("================");
      console.log(arguments);
      console.log("================");
    },
    
    pollCounters() {
      if (this.countersPollIntervalId) {
        clearInterval(this.countersPollIntervalId);
      }
      const t = this.$data.counters.autoUpdateTimeout;
      if (t) {
        this.countersPollIntervalId = setInterval(function(){
          const Http = new XMLHttpRequest();
          const url='/api/v1/cnc/counters';
          Http.open("GET", url);
          Http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200 ) {
              var obj = JSON.parse(Http.responseText); 
              console.log(obj);
//      this.$data.counters.data[3].value++;
//      this.$data.counters.data[4].value++;
            }
          };
          Http.send();
        }.bind(this), 1000 * t);
      }
    }
  },
  
  created: function () {
    this.pollCounters();
  },
  
  watch: {
    'counters.autoUpdateTimeout': function (newVal) {
      this.pollCounters();
    }
  },
  
  data: () => ({
    drawer: null,
    drawer_items: [
      { icon: 'track_changes', text: 'Counters' },
      { icon: 'import_export', text: 'Connections' },
      { divider: true },
      { icon: 'error_outline', text: 'Errors' },
    ],
    
    pagination: {
      sortBy: 'name'
    },
    
    counters: {
      autoUpdateTimeout: 5,
      autoUpdateList: Array.from(Array(11).keys()),
      
      headers: [
        { text: 'Counter', value: 'id',    align: 'right', sortable: true, width: 5 },
        { text: 'Name',    value: 'name',  align: 'left',  sortable: true },
        { text: 'Value',   value: 'value', align: 'right', sortable: false },
      ],

      data: [
        {
          id:  0,
          name: 'Bytes sent', 
          value: '292,870,080',
        },
        {
          id:  1,
          name: 'Bytes received', 
          value: '292,881,312',
        },
        {
          id:  2,
          name: 'Failed offers to ReceiverProxy', 
          value: 0,
        },
        {
          id:  3,
          name: 'Failed offers to SenderProxy', 
          value: 0,
        },
        {
          id:  4,
          name: 'Failed offers to DriverConductorProxy', 
          value: 0,
        },
        {
          id:  5,
          name: 'NAKs sent', 
          value: 0,
        },
        {
          id:  6,
          name: 'NAKs received', 
          value: 0,
        },
      ]
    }
  }),
})
