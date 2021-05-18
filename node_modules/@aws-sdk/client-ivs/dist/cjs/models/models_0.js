"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelSummary = exports.ListChannelsRequest = exports.ImportPlaybackKeyPairResponse = exports.ImportPlaybackKeyPairRequest = exports.GetStreamKeyResponse = exports.GetStreamKeyRequest = exports.GetStreamResponse = exports._Stream = exports.StreamState = exports.StreamHealth = exports.GetStreamRequest = exports.ChannelNotBroadcasting = exports.GetRecordingConfigurationResponse = exports.GetRecordingConfigurationRequest = exports.GetPlaybackKeyPairResponse = exports.PlaybackKeyPair = exports.GetPlaybackKeyPairRequest = exports.GetChannelResponse = exports.GetChannelRequest = exports.DeleteStreamKeyRequest = exports.DeleteRecordingConfigurationRequest = exports.DeletePlaybackKeyPairResponse = exports.DeletePlaybackKeyPairRequest = exports.DeleteChannelRequest = exports.CreateStreamKeyResponse = exports.CreateStreamKeyRequest = exports.InternalServerException = exports.CreateRecordingConfigurationResponse = exports.RecordingConfiguration = exports.RecordingConfigurationState = exports.CreateRecordingConfigurationRequest = exports.DestinationConfiguration = exports.S3DestinationConfiguration = exports.ConflictException = exports.ValidationException = exports.ServiceQuotaExceededException = exports.ResourceNotFoundException = exports.PendingVerification = exports.CreateChannelResponse = exports.CreateChannelRequest = exports.BatchGetStreamKeyResponse = exports.StreamKey = exports.BatchGetStreamKeyRequest = exports.BatchGetChannelResponse = exports.BatchError = exports.Channel = exports.ChannelType = exports.ChannelLatencyMode = exports.BatchGetChannelRequest = exports.AccessDeniedException = void 0;
exports.UpdateChannelResponse = exports.UpdateChannelRequest = exports.UntagResourceResponse = exports.UntagResourceRequest = exports.TagResourceResponse = exports.TagResourceRequest = exports.StreamUnavailable = exports.StopStreamResponse = exports.StopStreamRequest = exports.ThrottlingException = exports.PutMetadataRequest = exports.ListTagsForResourceResponse = exports.ListTagsForResourceRequest = exports.ListStreamsResponse = exports.StreamSummary = exports.ListStreamsRequest = exports.ListStreamKeysResponse = exports.StreamKeySummary = exports.ListStreamKeysRequest = exports.ListRecordingConfigurationsResponse = exports.RecordingConfigurationSummary = exports.ListRecordingConfigurationsRequest = exports.ListPlaybackKeyPairsResponse = exports.PlaybackKeyPairSummary = exports.ListPlaybackKeyPairsRequest = exports.ListChannelsResponse = void 0;
var AccessDeniedException;
(function (AccessDeniedException) {
    /**
     * @internal
     */
    AccessDeniedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccessDeniedException = exports.AccessDeniedException || (exports.AccessDeniedException = {}));
var BatchGetChannelRequest;
(function (BatchGetChannelRequest) {
    /**
     * @internal
     */
    BatchGetChannelRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchGetChannelRequest = exports.BatchGetChannelRequest || (exports.BatchGetChannelRequest = {}));
var ChannelLatencyMode;
(function (ChannelLatencyMode) {
    ChannelLatencyMode["LowLatency"] = "LOW";
    ChannelLatencyMode["NormalLatency"] = "NORMAL";
})(ChannelLatencyMode = exports.ChannelLatencyMode || (exports.ChannelLatencyMode = {}));
var ChannelType;
(function (ChannelType) {
    ChannelType["BasicChannelType"] = "BASIC";
    ChannelType["StandardChannelType"] = "STANDARD";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
var Channel;
(function (Channel) {
    /**
     * @internal
     */
    Channel.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Channel = exports.Channel || (exports.Channel = {}));
var BatchError;
(function (BatchError) {
    /**
     * @internal
     */
    BatchError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchError = exports.BatchError || (exports.BatchError = {}));
var BatchGetChannelResponse;
(function (BatchGetChannelResponse) {
    /**
     * @internal
     */
    BatchGetChannelResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchGetChannelResponse = exports.BatchGetChannelResponse || (exports.BatchGetChannelResponse = {}));
var BatchGetStreamKeyRequest;
(function (BatchGetStreamKeyRequest) {
    /**
     * @internal
     */
    BatchGetStreamKeyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchGetStreamKeyRequest = exports.BatchGetStreamKeyRequest || (exports.BatchGetStreamKeyRequest = {}));
var StreamKey;
(function (StreamKey) {
    /**
     * @internal
     */
    StreamKey.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamKey = exports.StreamKey || (exports.StreamKey = {}));
var BatchGetStreamKeyResponse;
(function (BatchGetStreamKeyResponse) {
    /**
     * @internal
     */
    BatchGetStreamKeyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchGetStreamKeyResponse = exports.BatchGetStreamKeyResponse || (exports.BatchGetStreamKeyResponse = {}));
var CreateChannelRequest;
(function (CreateChannelRequest) {
    /**
     * @internal
     */
    CreateChannelRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateChannelRequest = exports.CreateChannelRequest || (exports.CreateChannelRequest = {}));
var CreateChannelResponse;
(function (CreateChannelResponse) {
    /**
     * @internal
     */
    CreateChannelResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateChannelResponse = exports.CreateChannelResponse || (exports.CreateChannelResponse = {}));
var PendingVerification;
(function (PendingVerification) {
    /**
     * @internal
     */
    PendingVerification.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PendingVerification = exports.PendingVerification || (exports.PendingVerification = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    /**
     * @internal
     */
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var ServiceQuotaExceededException;
(function (ServiceQuotaExceededException) {
    /**
     * @internal
     */
    ServiceQuotaExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ServiceQuotaExceededException = exports.ServiceQuotaExceededException || (exports.ServiceQuotaExceededException = {}));
var ValidationException;
(function (ValidationException) {
    /**
     * @internal
     */
    ValidationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidationException = exports.ValidationException || (exports.ValidationException = {}));
var ConflictException;
(function (ConflictException) {
    /**
     * @internal
     */
    ConflictException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConflictException = exports.ConflictException || (exports.ConflictException = {}));
var S3DestinationConfiguration;
(function (S3DestinationConfiguration) {
    /**
     * @internal
     */
    S3DestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3DestinationConfiguration = exports.S3DestinationConfiguration || (exports.S3DestinationConfiguration = {}));
var DestinationConfiguration;
(function (DestinationConfiguration) {
    /**
     * @internal
     */
    DestinationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DestinationConfiguration = exports.DestinationConfiguration || (exports.DestinationConfiguration = {}));
var CreateRecordingConfigurationRequest;
(function (CreateRecordingConfigurationRequest) {
    /**
     * @internal
     */
    CreateRecordingConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateRecordingConfigurationRequest = exports.CreateRecordingConfigurationRequest || (exports.CreateRecordingConfigurationRequest = {}));
var RecordingConfigurationState;
(function (RecordingConfigurationState) {
    RecordingConfigurationState["Active"] = "ACTIVE";
    RecordingConfigurationState["CreateFailed"] = "CREATE_FAILED";
    RecordingConfigurationState["Creating"] = "CREATING";
})(RecordingConfigurationState = exports.RecordingConfigurationState || (exports.RecordingConfigurationState = {}));
var RecordingConfiguration;
(function (RecordingConfiguration) {
    /**
     * @internal
     */
    RecordingConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RecordingConfiguration = exports.RecordingConfiguration || (exports.RecordingConfiguration = {}));
var CreateRecordingConfigurationResponse;
(function (CreateRecordingConfigurationResponse) {
    /**
     * @internal
     */
    CreateRecordingConfigurationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateRecordingConfigurationResponse = exports.CreateRecordingConfigurationResponse || (exports.CreateRecordingConfigurationResponse = {}));
var InternalServerException;
(function (InternalServerException) {
    /**
     * @internal
     */
    InternalServerException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InternalServerException = exports.InternalServerException || (exports.InternalServerException = {}));
var CreateStreamKeyRequest;
(function (CreateStreamKeyRequest) {
    /**
     * @internal
     */
    CreateStreamKeyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateStreamKeyRequest = exports.CreateStreamKeyRequest || (exports.CreateStreamKeyRequest = {}));
var CreateStreamKeyResponse;
(function (CreateStreamKeyResponse) {
    /**
     * @internal
     */
    CreateStreamKeyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateStreamKeyResponse = exports.CreateStreamKeyResponse || (exports.CreateStreamKeyResponse = {}));
var DeleteChannelRequest;
(function (DeleteChannelRequest) {
    /**
     * @internal
     */
    DeleteChannelRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteChannelRequest = exports.DeleteChannelRequest || (exports.DeleteChannelRequest = {}));
var DeletePlaybackKeyPairRequest;
(function (DeletePlaybackKeyPairRequest) {
    /**
     * @internal
     */
    DeletePlaybackKeyPairRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeletePlaybackKeyPairRequest = exports.DeletePlaybackKeyPairRequest || (exports.DeletePlaybackKeyPairRequest = {}));
var DeletePlaybackKeyPairResponse;
(function (DeletePlaybackKeyPairResponse) {
    /**
     * @internal
     */
    DeletePlaybackKeyPairResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeletePlaybackKeyPairResponse = exports.DeletePlaybackKeyPairResponse || (exports.DeletePlaybackKeyPairResponse = {}));
var DeleteRecordingConfigurationRequest;
(function (DeleteRecordingConfigurationRequest) {
    /**
     * @internal
     */
    DeleteRecordingConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteRecordingConfigurationRequest = exports.DeleteRecordingConfigurationRequest || (exports.DeleteRecordingConfigurationRequest = {}));
var DeleteStreamKeyRequest;
(function (DeleteStreamKeyRequest) {
    /**
     * @internal
     */
    DeleteStreamKeyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteStreamKeyRequest = exports.DeleteStreamKeyRequest || (exports.DeleteStreamKeyRequest = {}));
var GetChannelRequest;
(function (GetChannelRequest) {
    /**
     * @internal
     */
    GetChannelRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetChannelRequest = exports.GetChannelRequest || (exports.GetChannelRequest = {}));
var GetChannelResponse;
(function (GetChannelResponse) {
    /**
     * @internal
     */
    GetChannelResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetChannelResponse = exports.GetChannelResponse || (exports.GetChannelResponse = {}));
var GetPlaybackKeyPairRequest;
(function (GetPlaybackKeyPairRequest) {
    /**
     * @internal
     */
    GetPlaybackKeyPairRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPlaybackKeyPairRequest = exports.GetPlaybackKeyPairRequest || (exports.GetPlaybackKeyPairRequest = {}));
var PlaybackKeyPair;
(function (PlaybackKeyPair) {
    /**
     * @internal
     */
    PlaybackKeyPair.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PlaybackKeyPair = exports.PlaybackKeyPair || (exports.PlaybackKeyPair = {}));
var GetPlaybackKeyPairResponse;
(function (GetPlaybackKeyPairResponse) {
    /**
     * @internal
     */
    GetPlaybackKeyPairResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPlaybackKeyPairResponse = exports.GetPlaybackKeyPairResponse || (exports.GetPlaybackKeyPairResponse = {}));
var GetRecordingConfigurationRequest;
(function (GetRecordingConfigurationRequest) {
    /**
     * @internal
     */
    GetRecordingConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRecordingConfigurationRequest = exports.GetRecordingConfigurationRequest || (exports.GetRecordingConfigurationRequest = {}));
var GetRecordingConfigurationResponse;
(function (GetRecordingConfigurationResponse) {
    /**
     * @internal
     */
    GetRecordingConfigurationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRecordingConfigurationResponse = exports.GetRecordingConfigurationResponse || (exports.GetRecordingConfigurationResponse = {}));
var ChannelNotBroadcasting;
(function (ChannelNotBroadcasting) {
    /**
     * @internal
     */
    ChannelNotBroadcasting.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChannelNotBroadcasting = exports.ChannelNotBroadcasting || (exports.ChannelNotBroadcasting = {}));
var GetStreamRequest;
(function (GetStreamRequest) {
    /**
     * @internal
     */
    GetStreamRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetStreamRequest = exports.GetStreamRequest || (exports.GetStreamRequest = {}));
var StreamHealth;
(function (StreamHealth) {
    StreamHealth["Starving"] = "STARVING";
    StreamHealth["StreamHealthy"] = "HEALTHY";
    StreamHealth["Unknown"] = "UNKNOWN";
})(StreamHealth = exports.StreamHealth || (exports.StreamHealth = {}));
var StreamState;
(function (StreamState) {
    StreamState["StreamLive"] = "LIVE";
    StreamState["StreamOffline"] = "OFFLINE";
})(StreamState = exports.StreamState || (exports.StreamState = {}));
var _Stream;
(function (_Stream) {
    /**
     * @internal
     */
    _Stream.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(_Stream = exports._Stream || (exports._Stream = {}));
var GetStreamResponse;
(function (GetStreamResponse) {
    /**
     * @internal
     */
    GetStreamResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetStreamResponse = exports.GetStreamResponse || (exports.GetStreamResponse = {}));
var GetStreamKeyRequest;
(function (GetStreamKeyRequest) {
    /**
     * @internal
     */
    GetStreamKeyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetStreamKeyRequest = exports.GetStreamKeyRequest || (exports.GetStreamKeyRequest = {}));
var GetStreamKeyResponse;
(function (GetStreamKeyResponse) {
    /**
     * @internal
     */
    GetStreamKeyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetStreamKeyResponse = exports.GetStreamKeyResponse || (exports.GetStreamKeyResponse = {}));
var ImportPlaybackKeyPairRequest;
(function (ImportPlaybackKeyPairRequest) {
    /**
     * @internal
     */
    ImportPlaybackKeyPairRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ImportPlaybackKeyPairRequest = exports.ImportPlaybackKeyPairRequest || (exports.ImportPlaybackKeyPairRequest = {}));
var ImportPlaybackKeyPairResponse;
(function (ImportPlaybackKeyPairResponse) {
    /**
     * @internal
     */
    ImportPlaybackKeyPairResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ImportPlaybackKeyPairResponse = exports.ImportPlaybackKeyPairResponse || (exports.ImportPlaybackKeyPairResponse = {}));
var ListChannelsRequest;
(function (ListChannelsRequest) {
    /**
     * @internal
     */
    ListChannelsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListChannelsRequest = exports.ListChannelsRequest || (exports.ListChannelsRequest = {}));
var ChannelSummary;
(function (ChannelSummary) {
    /**
     * @internal
     */
    ChannelSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ChannelSummary = exports.ChannelSummary || (exports.ChannelSummary = {}));
var ListChannelsResponse;
(function (ListChannelsResponse) {
    /**
     * @internal
     */
    ListChannelsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListChannelsResponse = exports.ListChannelsResponse || (exports.ListChannelsResponse = {}));
var ListPlaybackKeyPairsRequest;
(function (ListPlaybackKeyPairsRequest) {
    /**
     * @internal
     */
    ListPlaybackKeyPairsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPlaybackKeyPairsRequest = exports.ListPlaybackKeyPairsRequest || (exports.ListPlaybackKeyPairsRequest = {}));
var PlaybackKeyPairSummary;
(function (PlaybackKeyPairSummary) {
    /**
     * @internal
     */
    PlaybackKeyPairSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PlaybackKeyPairSummary = exports.PlaybackKeyPairSummary || (exports.PlaybackKeyPairSummary = {}));
var ListPlaybackKeyPairsResponse;
(function (ListPlaybackKeyPairsResponse) {
    /**
     * @internal
     */
    ListPlaybackKeyPairsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPlaybackKeyPairsResponse = exports.ListPlaybackKeyPairsResponse || (exports.ListPlaybackKeyPairsResponse = {}));
var ListRecordingConfigurationsRequest;
(function (ListRecordingConfigurationsRequest) {
    /**
     * @internal
     */
    ListRecordingConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListRecordingConfigurationsRequest = exports.ListRecordingConfigurationsRequest || (exports.ListRecordingConfigurationsRequest = {}));
var RecordingConfigurationSummary;
(function (RecordingConfigurationSummary) {
    /**
     * @internal
     */
    RecordingConfigurationSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RecordingConfigurationSummary = exports.RecordingConfigurationSummary || (exports.RecordingConfigurationSummary = {}));
var ListRecordingConfigurationsResponse;
(function (ListRecordingConfigurationsResponse) {
    /**
     * @internal
     */
    ListRecordingConfigurationsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListRecordingConfigurationsResponse = exports.ListRecordingConfigurationsResponse || (exports.ListRecordingConfigurationsResponse = {}));
var ListStreamKeysRequest;
(function (ListStreamKeysRequest) {
    /**
     * @internal
     */
    ListStreamKeysRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamKeysRequest = exports.ListStreamKeysRequest || (exports.ListStreamKeysRequest = {}));
var StreamKeySummary;
(function (StreamKeySummary) {
    /**
     * @internal
     */
    StreamKeySummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamKeySummary = exports.StreamKeySummary || (exports.StreamKeySummary = {}));
var ListStreamKeysResponse;
(function (ListStreamKeysResponse) {
    /**
     * @internal
     */
    ListStreamKeysResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamKeysResponse = exports.ListStreamKeysResponse || (exports.ListStreamKeysResponse = {}));
var ListStreamsRequest;
(function (ListStreamsRequest) {
    /**
     * @internal
     */
    ListStreamsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamsRequest = exports.ListStreamsRequest || (exports.ListStreamsRequest = {}));
var StreamSummary;
(function (StreamSummary) {
    /**
     * @internal
     */
    StreamSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamSummary = exports.StreamSummary || (exports.StreamSummary = {}));
var ListStreamsResponse;
(function (ListStreamsResponse) {
    /**
     * @internal
     */
    ListStreamsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamsResponse = exports.ListStreamsResponse || (exports.ListStreamsResponse = {}));
var ListTagsForResourceRequest;
(function (ListTagsForResourceRequest) {
    /**
     * @internal
     */
    ListTagsForResourceRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForResourceRequest = exports.ListTagsForResourceRequest || (exports.ListTagsForResourceRequest = {}));
var ListTagsForResourceResponse;
(function (ListTagsForResourceResponse) {
    /**
     * @internal
     */
    ListTagsForResourceResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForResourceResponse = exports.ListTagsForResourceResponse || (exports.ListTagsForResourceResponse = {}));
var PutMetadataRequest;
(function (PutMetadataRequest) {
    /**
     * @internal
     */
    PutMetadataRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutMetadataRequest = exports.PutMetadataRequest || (exports.PutMetadataRequest = {}));
var ThrottlingException;
(function (ThrottlingException) {
    /**
     * @internal
     */
    ThrottlingException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ThrottlingException = exports.ThrottlingException || (exports.ThrottlingException = {}));
var StopStreamRequest;
(function (StopStreamRequest) {
    /**
     * @internal
     */
    StopStreamRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopStreamRequest = exports.StopStreamRequest || (exports.StopStreamRequest = {}));
var StopStreamResponse;
(function (StopStreamResponse) {
    /**
     * @internal
     */
    StopStreamResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopStreamResponse = exports.StopStreamResponse || (exports.StopStreamResponse = {}));
var StreamUnavailable;
(function (StreamUnavailable) {
    /**
     * @internal
     */
    StreamUnavailable.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamUnavailable = exports.StreamUnavailable || (exports.StreamUnavailable = {}));
var TagResourceRequest;
(function (TagResourceRequest) {
    /**
     * @internal
     */
    TagResourceRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TagResourceRequest = exports.TagResourceRequest || (exports.TagResourceRequest = {}));
var TagResourceResponse;
(function (TagResourceResponse) {
    /**
     * @internal
     */
    TagResourceResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TagResourceResponse = exports.TagResourceResponse || (exports.TagResourceResponse = {}));
var UntagResourceRequest;
(function (UntagResourceRequest) {
    /**
     * @internal
     */
    UntagResourceRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UntagResourceRequest = exports.UntagResourceRequest || (exports.UntagResourceRequest = {}));
var UntagResourceResponse;
(function (UntagResourceResponse) {
    /**
     * @internal
     */
    UntagResourceResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UntagResourceResponse = exports.UntagResourceResponse || (exports.UntagResourceResponse = {}));
var UpdateChannelRequest;
(function (UpdateChannelRequest) {
    /**
     * @internal
     */
    UpdateChannelRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateChannelRequest = exports.UpdateChannelRequest || (exports.UpdateChannelRequest = {}));
var UpdateChannelResponse;
(function (UpdateChannelResponse) {
    /**
     * @internal
     */
    UpdateChannelResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateChannelResponse = exports.UpdateChannelResponse || (exports.UpdateChannelResponse = {}));
//# sourceMappingURL=models_0.js.map