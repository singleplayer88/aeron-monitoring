package io.aeron.monitoring.model;

import java.util.List;
import java.util.Map;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Represents the entire snapshot of Aeron CnC file")
public class Snapshot {

    @ApiModelProperty("Version of the CNC file")
    private final int version;

    @ApiModelProperty("Maximum counter id which can be supported given the length of the values buffer")
    private final int maxCounterId;

    @ApiModelProperty("Contains counters related to media driver entirely")
    private final List<CounterValue> counters;

    @ApiModelProperty("Contains information related to media driver pipes")
    private final Map<String, ChannelInfo> channels;

    public Snapshot(
            final int version,
            final int maxCounterId,
            final List<CounterValue> counters,
            final Map<String, ChannelInfo> channels) {
        this.version = version;
        this.maxCounterId = maxCounterId;
        this.counters = counters;
        this.channels = channels;
    }

    public int getVersion() {
        return version;
    }

    public int getMaxCounterId() {
        return maxCounterId;
    }

    public List<CounterValue> getCounters() {
        return counters;
    }

    public Map<String, ChannelInfo> getChannels() {
        return channels;
    }
}
