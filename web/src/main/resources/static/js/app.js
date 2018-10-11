new Vue({
  el: '#app',

  methods: {
    onDrawerItem() {
      console.log("================");
      console.log(arguments);
      console.log("================");
    },
    
    pollCounters() {
      var self = this;
      
      var poll =  function(){
        const Http = new XMLHttpRequest();
        Http.open("GET", '/api/v1/cnc/counters');

        Http.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200 ) {
            const counters = JSON.parse(Http.responseText); 
            var data = self.$data.counters.data;
            for (var i = 0; i != counters.length; i++) {
              const c = counters[i];
              var d = self.$data.counters.data[i];
              if (d) {
                d.id = i;
                d.name = c.label;
                d.value = c.value;
              } else {
                const n = {
                    id: i,
                    name: c.label,
                    value: c.value
                };
                data.push(n);
              }
            }
            data.length = counters.length;
          }
        };
        Http.send();
      };
      
      if (this.countersPollIntervalId) {
        clearInterval(this.countersPollIntervalId);
      }

      const t = this.$data.counters.autoUpdateTimeout;
      if (t) {
        poll();
        this.countersPollIntervalId = setInterval(function() {
          poll();
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
      ]
    }
  }),
})