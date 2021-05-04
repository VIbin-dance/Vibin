"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1TagResourceCommand = exports.deserializeAws_restJson1StopStreamCommand = exports.deserializeAws_restJson1PutMetadataCommand = exports.deserializeAws_restJson1ListTagsForResourceCommand = exports.deserializeAws_restJson1ListStreamsCommand = exports.deserializeAws_restJson1ListStreamKeysCommand = exports.deserializeAws_restJson1ListRecordingConfigurationsCommand = exports.deserializeAws_restJson1ListPlaybackKeyPairsCommand = exports.deserializeAws_restJson1ListChannelsCommand = exports.deserializeAws_restJson1ImportPlaybackKeyPairCommand = exports.deserializeAws_restJson1GetStreamKeyCommand = exports.deserializeAws_restJson1GetStreamCommand = exports.deserializeAws_restJson1GetRecordingConfigurationCommand = exports.deserializeAws_restJson1GetPlaybackKeyPairCommand = exports.deserializeAws_restJson1GetChannelCommand = exports.deserializeAws_restJson1DeleteStreamKeyCommand = exports.deserializeAws_restJson1DeleteRecordingConfigurationCommand = exports.deserializeAws_restJson1DeletePlaybackKeyPairCommand = exports.deserializeAws_restJson1DeleteChannelCommand = exports.deserializeAws_restJson1CreateStreamKeyCommand = exports.deserializeAws_restJson1CreateRecordingConfigurationCommand = exports.deserializeAws_restJson1CreateChannelCommand = exports.deserializeAws_restJson1BatchGetStreamKeyCommand = exports.deserializeAws_restJson1BatchGetChannelCommand = exports.serializeAws_restJson1UpdateChannelCommand = exports.serializeAws_restJson1UntagResourceCommand = exports.serializeAws_restJson1TagResourceCommand = exports.serializeAws_restJson1StopStreamCommand = exports.serializeAws_restJson1PutMetadataCommand = exports.serializeAws_restJson1ListTagsForResourceCommand = exports.serializeAws_restJson1ListStreamsCommand = exports.serializeAws_restJson1ListStreamKeysCommand = exports.serializeAws_restJson1ListRecordingConfigurationsCommand = exports.serializeAws_restJson1ListPlaybackKeyPairsCommand = exports.serializeAws_restJson1ListChannelsCommand = exports.serializeAws_restJson1ImportPlaybackKeyPairCommand = exports.serializeAws_restJson1GetStreamKeyCommand = exports.serializeAws_restJson1GetStreamCommand = exports.serializeAws_restJson1GetRecordingConfigurationCommand = exports.serializeAws_restJson1GetPlaybackKeyPairCommand = exports.serializeAws_restJson1GetChannelCommand = exports.serializeAws_restJson1DeleteStreamKeyCommand = exports.serializeAws_restJson1DeleteRecordingConfigurationCommand = exports.serializeAws_restJson1DeletePlaybackKeyPairCommand = exports.serializeAws_restJson1DeleteChannelCommand = exports.serializeAws_restJson1CreateStreamKeyCommand = exports.serializeAws_restJson1CreateRecordingConfigurationCommand = exports.serializeAws_restJson1CreateChannelCommand = exports.serializeAws_restJson1BatchGetStreamKeyCommand = exports.serializeAws_restJson1BatchGetChannelCommand = void 0;
exports.deserializeAws_restJson1UpdateChannelCommand = exports.deserializeAws_restJson1UntagResourceCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1BatchGetChannelCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/BatchGetChannel";
    let body;
    body = JSON.stringify({
        ...(input.arns !== undefined &&
            input.arns !== null && { arns: serializeAws_restJson1ChannelArnList(input.arns, context) }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1BatchGetChannelCommand = serializeAws_restJson1BatchGetChannelCommand;
const serializeAws_restJson1BatchGetStreamKeyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/BatchGetStreamKey";
    let body;
    body = JSON.stringify({
        ...(input.arns !== undefined &&
            input.arns !== null && { arns: serializeAws_restJson1StreamKeyArnList(input.arns, context) }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1BatchGetStreamKeyCommand = serializeAws_restJson1BatchGetStreamKeyCommand;
const serializeAws_restJson1CreateChannelCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/CreateChannel";
    let body;
    body = JSON.stringify({
        ...(input.authorized !== undefined && input.authorized !== null && { authorized: input.authorized }),
        ...(input.latencyMode !== undefined && input.latencyMode !== null && { latencyMode: input.latencyMode }),
        ...(input.name !== undefined && input.name !== null && { name: input.name }),
        ...(input.recordingConfigurationArn !== undefined &&
            input.recordingConfigurationArn !== null && { recordingConfigurationArn: input.recordingConfigurationArn }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_restJson1Tags(input.tags, context) }),
        ...(input.type !== undefined && input.type !== null && { type: input.type }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1CreateChannelCommand = serializeAws_restJson1CreateChannelCommand;
const serializeAws_restJson1CreateRecordingConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/CreateRecordingConfiguration";
    let body;
    body = JSON.stringify({
        ...(input.destinationConfiguration !== undefined &&
            input.destinationConfiguration !== null && {
            destinationConfiguration: serializeAws_restJson1DestinationConfiguration(input.destinationConfiguration, context),
        }),
        ...(input.name !== undefined && input.name !== null && { name: input.name }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_restJson1Tags(input.tags, context) }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1CreateRecordingConfigurationCommand = serializeAws_restJson1CreateRecordingConfigurationCommand;
const serializeAws_restJson1CreateStreamKeyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/CreateStreamKey";
    let body;
    body = JSON.stringify({
        ...(input.channelArn !== undefined && input.channelArn !== null && { channelArn: input.channelArn }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_restJson1Tags(input.tags, context) }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1CreateStreamKeyCommand = serializeAws_restJson1CreateStreamKeyCommand;
const serializeAws_restJson1DeleteChannelCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/DeleteChannel";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1DeleteChannelCommand = serializeAws_restJson1DeleteChannelCommand;
const serializeAws_restJson1DeletePlaybackKeyPairCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/DeletePlaybackKeyPair";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1DeletePlaybackKeyPairCommand = serializeAws_restJson1DeletePlaybackKeyPairCommand;
const serializeAws_restJson1DeleteRecordingConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/DeleteRecordingConfiguration";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1DeleteRecordingConfigurationCommand = serializeAws_restJson1DeleteRecordingConfigurationCommand;
const serializeAws_restJson1DeleteStreamKeyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/DeleteStreamKey";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1DeleteStreamKeyCommand = serializeAws_restJson1DeleteStreamKeyCommand;
const serializeAws_restJson1GetChannelCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/GetChannel";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetChannelCommand = serializeAws_restJson1GetChannelCommand;
const serializeAws_restJson1GetPlaybackKeyPairCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/GetPlaybackKeyPair";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetPlaybackKeyPairCommand = serializeAws_restJson1GetPlaybackKeyPairCommand;
const serializeAws_restJson1GetRecordingConfigurationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/GetRecordingConfiguration";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetRecordingConfigurationCommand = serializeAws_restJson1GetRecordingConfigurationCommand;
const serializeAws_restJson1GetStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/GetStream";
    let body;
    body = JSON.stringify({
        ...(input.channelArn !== undefined && input.channelArn !== null && { channelArn: input.channelArn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetStreamCommand = serializeAws_restJson1GetStreamCommand;
const serializeAws_restJson1GetStreamKeyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/GetStreamKey";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetStreamKeyCommand = serializeAws_restJson1GetStreamKeyCommand;
const serializeAws_restJson1ImportPlaybackKeyPairCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/ImportPlaybackKeyPair";
    let body;
    body = JSON.stringify({
        ...(input.name !== undefined && input.name !== null && { name: input.name }),
        ...(input.publicKeyMaterial !== undefined &&
            input.publicKeyMaterial !== null && { publicKeyMaterial: input.publicKeyMaterial }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_restJson1Tags(input.tags, context) }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1ImportPlaybackKeyPairCommand = serializeAws_restJson1ImportPlaybackKeyPairCommand;
const serializeAws_restJson1ListChannelsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/ListChannels";
    let body;
    body = JSON.stringify({
        ...(input.filterByName !== undefined && input.filterByName !== null && { filterByName: input.filterByName }),
        ...(input.filterByRecordingConfigurationArn !== undefined &&
            input.filterByRecordingConfigurationArn !== null && {
            filterByRecordingConfigurationArn: input.filterByRecordingConfigurationArn,
        }),
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1ListChannelsCommand = serializeAws_restJson1ListChannelsCommand;
const serializeAws_restJson1ListPlaybackKeyPairsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/ListPlaybackKeyPairs";
    let body;
    body = JSON.stringify({
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1ListPlaybackKeyPairsCommand = serializeAws_restJson1ListPlaybackKeyPairsCommand;
const serializeAws_restJson1ListRecordingConfigurationsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/ListRecordingConfigurations";
    let body;
    body = JSON.stringify({
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1ListRecordingConfigurationsCommand = serializeAws_restJson1ListRecordingConfigurationsCommand;
const serializeAws_restJson1ListStreamKeysCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/ListStreamKeys";
    let body;
    body = JSON.stringify({
        ...(input.channelArn !== undefined && input.channelArn !== null && { channelArn: input.channelArn }),
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1ListStreamKeysCommand = serializeAws_restJson1ListStreamKeysCommand;
const serializeAws_restJson1ListStreamsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/ListStreams";
    let body;
    body = JSON.stringify({
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1ListStreamsCommand = serializeAws_restJson1ListStreamsCommand;
const serializeAws_restJson1ListTagsForResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/tags/{resourceArn}";
    if (input.resourceArn !== undefined) {
        const labelValue = input.resourceArn;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: resourceArn.");
        }
        resolvedPath = resolvedPath.replace("{resourceArn}", smithy_client_1.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: resourceArn.");
    }
    let body;
    body = JSON.stringify({
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1ListTagsForResourceCommand = serializeAws_restJson1ListTagsForResourceCommand;
const serializeAws_restJson1PutMetadataCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/PutMetadata";
    let body;
    body = JSON.stringify({
        ...(input.channelArn !== undefined && input.channelArn !== null && { channelArn: input.channelArn }),
        ...(input.metadata !== undefined && input.metadata !== null && { metadata: input.metadata }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1PutMetadataCommand = serializeAws_restJson1PutMetadataCommand;
const serializeAws_restJson1StopStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/StopStream";
    let body;
    body = JSON.stringify({
        ...(input.channelArn !== undefined && input.channelArn !== null && { channelArn: input.channelArn }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1StopStreamCommand = serializeAws_restJson1StopStreamCommand;
const serializeAws_restJson1TagResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/tags/{resourceArn}";
    if (input.resourceArn !== undefined) {
        const labelValue = input.resourceArn;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: resourceArn.");
        }
        resolvedPath = resolvedPath.replace("{resourceArn}", smithy_client_1.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: resourceArn.");
    }
    let body;
    body = JSON.stringify({
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_restJson1Tags(input.tags, context) }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1TagResourceCommand = serializeAws_restJson1TagResourceCommand;
const serializeAws_restJson1UntagResourceCommand = async (input, context) => {
    const headers = {};
    let resolvedPath = "/tags/{resourceArn}";
    if (input.resourceArn !== undefined) {
        const labelValue = input.resourceArn;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: resourceArn.");
        }
        resolvedPath = resolvedPath.replace("{resourceArn}", smithy_client_1.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: resourceArn.");
    }
    const query = {
        ...(input.tagKeys !== undefined && { tagKeys: (input.tagKeys || []).map((_entry) => _entry) }),
    };
    let body;
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "DELETE",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1UntagResourceCommand = serializeAws_restJson1UntagResourceCommand;
const serializeAws_restJson1UpdateChannelCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/UpdateChannel";
    let body;
    body = JSON.stringify({
        ...(input.arn !== undefined && input.arn !== null && { arn: input.arn }),
        ...(input.authorized !== undefined && input.authorized !== null && { authorized: input.authorized }),
        ...(input.latencyMode !== undefined && input.latencyMode !== null && { latencyMode: input.latencyMode }),
        ...(input.name !== undefined && input.name !== null && { name: input.name }),
        ...(input.recordingConfigurationArn !== undefined &&
            input.recordingConfigurationArn !== null && { recordingConfigurationArn: input.recordingConfigurationArn }),
        ...(input.type !== undefined && input.type !== null && { type: input.type }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1UpdateChannelCommand = serializeAws_restJson1UpdateChannelCommand;
const deserializeAws_restJson1BatchGetChannelCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1BatchGetChannelCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        channels: undefined,
        errors: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.channels !== undefined && data.channels !== null) {
        contents.channels = deserializeAws_restJson1Channels(data.channels, context);
    }
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1BatchErrors(data.errors, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1BatchGetChannelCommand = deserializeAws_restJson1BatchGetChannelCommand;
const deserializeAws_restJson1BatchGetChannelCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1BatchGetStreamKeyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1BatchGetStreamKeyCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        errors: undefined,
        streamKeys: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1BatchErrors(data.errors, context);
    }
    if (data.streamKeys !== undefined && data.streamKeys !== null) {
        contents.streamKeys = deserializeAws_restJson1StreamKeys(data.streamKeys, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1BatchGetStreamKeyCommand = deserializeAws_restJson1BatchGetStreamKeyCommand;
const deserializeAws_restJson1BatchGetStreamKeyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1CreateChannelCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateChannelCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        channel: undefined,
        streamKey: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.channel !== undefined && data.channel !== null) {
        contents.channel = deserializeAws_restJson1Channel(data.channel, context);
    }
    if (data.streamKey !== undefined && data.streamKey !== null) {
        contents.streamKey = deserializeAws_restJson1StreamKey(data.streamKey, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateChannelCommand = deserializeAws_restJson1CreateChannelCommand;
const deserializeAws_restJson1CreateChannelCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceQuotaExceededException":
        case "com.amazonaws.ivs#ServiceQuotaExceededException":
            response = {
                ...(await deserializeAws_restJson1ServiceQuotaExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1CreateRecordingConfigurationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateRecordingConfigurationCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        recordingConfiguration: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.recordingConfiguration !== undefined && data.recordingConfiguration !== null) {
        contents.recordingConfiguration = deserializeAws_restJson1RecordingConfiguration(data.recordingConfiguration, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateRecordingConfigurationCommand = deserializeAws_restJson1CreateRecordingConfigurationCommand;
const deserializeAws_restJson1CreateRecordingConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ConflictException":
        case "com.amazonaws.ivs#ConflictException":
            response = {
                ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.ivs#InternalServerException":
            response = {
                ...(await deserializeAws_restJson1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceQuotaExceededException":
        case "com.amazonaws.ivs#ServiceQuotaExceededException":
            response = {
                ...(await deserializeAws_restJson1ServiceQuotaExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1CreateStreamKeyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateStreamKeyCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        streamKey: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.streamKey !== undefined && data.streamKey !== null) {
        contents.streamKey = deserializeAws_restJson1StreamKey(data.streamKey, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateStreamKeyCommand = deserializeAws_restJson1CreateStreamKeyCommand;
const deserializeAws_restJson1CreateStreamKeyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceQuotaExceededException":
        case "com.amazonaws.ivs#ServiceQuotaExceededException":
            response = {
                ...(await deserializeAws_restJson1ServiceQuotaExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1DeleteChannelCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeleteChannelCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeleteChannelCommand = deserializeAws_restJson1DeleteChannelCommand;
const deserializeAws_restJson1DeleteChannelCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ConflictException":
        case "com.amazonaws.ivs#ConflictException":
            response = {
                ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1DeletePlaybackKeyPairCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeletePlaybackKeyPairCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeletePlaybackKeyPairCommand = deserializeAws_restJson1DeletePlaybackKeyPairCommand;
const deserializeAws_restJson1DeletePlaybackKeyPairCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1DeleteRecordingConfigurationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeleteRecordingConfigurationCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeleteRecordingConfigurationCommand = deserializeAws_restJson1DeleteRecordingConfigurationCommand;
const deserializeAws_restJson1DeleteRecordingConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ConflictException":
        case "com.amazonaws.ivs#ConflictException":
            response = {
                ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.ivs#InternalServerException":
            response = {
                ...(await deserializeAws_restJson1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1DeleteStreamKeyCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeleteStreamKeyCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeleteStreamKeyCommand = deserializeAws_restJson1DeleteStreamKeyCommand;
const deserializeAws_restJson1DeleteStreamKeyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1GetChannelCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetChannelCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        channel: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.channel !== undefined && data.channel !== null) {
        contents.channel = deserializeAws_restJson1Channel(data.channel, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetChannelCommand = deserializeAws_restJson1GetChannelCommand;
const deserializeAws_restJson1GetChannelCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1GetPlaybackKeyPairCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetPlaybackKeyPairCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        keyPair: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.keyPair !== undefined && data.keyPair !== null) {
        contents.keyPair = deserializeAws_restJson1PlaybackKeyPair(data.keyPair, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetPlaybackKeyPairCommand = deserializeAws_restJson1GetPlaybackKeyPairCommand;
const deserializeAws_restJson1GetPlaybackKeyPairCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1GetRecordingConfigurationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetRecordingConfigurationCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        recordingConfiguration: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.recordingConfiguration !== undefined && data.recordingConfiguration !== null) {
        contents.recordingConfiguration = deserializeAws_restJson1RecordingConfiguration(data.recordingConfiguration, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetRecordingConfigurationCommand = deserializeAws_restJson1GetRecordingConfigurationCommand;
const deserializeAws_restJson1GetRecordingConfigurationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.ivs#InternalServerException":
            response = {
                ...(await deserializeAws_restJson1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1GetStreamCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetStreamCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        stream: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.stream !== undefined && data.stream !== null) {
        contents.stream = deserializeAws_restJson1_Stream(data.stream, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetStreamCommand = deserializeAws_restJson1GetStreamCommand;
const deserializeAws_restJson1GetStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ChannelNotBroadcasting":
        case "com.amazonaws.ivs#ChannelNotBroadcasting":
            response = {
                ...(await deserializeAws_restJson1ChannelNotBroadcastingResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1GetStreamKeyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetStreamKeyCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        streamKey: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.streamKey !== undefined && data.streamKey !== null) {
        contents.streamKey = deserializeAws_restJson1StreamKey(data.streamKey, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetStreamKeyCommand = deserializeAws_restJson1GetStreamKeyCommand;
const deserializeAws_restJson1GetStreamKeyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1ImportPlaybackKeyPairCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ImportPlaybackKeyPairCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        keyPair: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.keyPair !== undefined && data.keyPair !== null) {
        contents.keyPair = deserializeAws_restJson1PlaybackKeyPair(data.keyPair, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ImportPlaybackKeyPairCommand = deserializeAws_restJson1ImportPlaybackKeyPairCommand;
const deserializeAws_restJson1ImportPlaybackKeyPairCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ConflictException":
        case "com.amazonaws.ivs#ConflictException":
            response = {
                ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceQuotaExceededException":
        case "com.amazonaws.ivs#ServiceQuotaExceededException":
            response = {
                ...(await deserializeAws_restJson1ServiceQuotaExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1ListChannelsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListChannelsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        channels: undefined,
        nextToken: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.channels !== undefined && data.channels !== null) {
        contents.channels = deserializeAws_restJson1ChannelList(data.channels, context);
    }
    if (data.nextToken !== undefined && data.nextToken !== null) {
        contents.nextToken = data.nextToken;
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListChannelsCommand = deserializeAws_restJson1ListChannelsCommand;
const deserializeAws_restJson1ListChannelsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ConflictException":
        case "com.amazonaws.ivs#ConflictException":
            response = {
                ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1ListPlaybackKeyPairsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListPlaybackKeyPairsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        keyPairs: undefined,
        nextToken: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.keyPairs !== undefined && data.keyPairs !== null) {
        contents.keyPairs = deserializeAws_restJson1PlaybackKeyPairList(data.keyPairs, context);
    }
    if (data.nextToken !== undefined && data.nextToken !== null) {
        contents.nextToken = data.nextToken;
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListPlaybackKeyPairsCommand = deserializeAws_restJson1ListPlaybackKeyPairsCommand;
const deserializeAws_restJson1ListPlaybackKeyPairsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1ListRecordingConfigurationsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListRecordingConfigurationsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        nextToken: undefined,
        recordingConfigurations: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.nextToken !== undefined && data.nextToken !== null) {
        contents.nextToken = data.nextToken;
    }
    if (data.recordingConfigurations !== undefined && data.recordingConfigurations !== null) {
        contents.recordingConfigurations = deserializeAws_restJson1RecordingConfigurationList(data.recordingConfigurations, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListRecordingConfigurationsCommand = deserializeAws_restJson1ListRecordingConfigurationsCommand;
const deserializeAws_restJson1ListRecordingConfigurationsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.ivs#InternalServerException":
            response = {
                ...(await deserializeAws_restJson1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1ListStreamKeysCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListStreamKeysCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        nextToken: undefined,
        streamKeys: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.nextToken !== undefined && data.nextToken !== null) {
        contents.nextToken = data.nextToken;
    }
    if (data.streamKeys !== undefined && data.streamKeys !== null) {
        contents.streamKeys = deserializeAws_restJson1StreamKeyList(data.streamKeys, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListStreamKeysCommand = deserializeAws_restJson1ListStreamKeysCommand;
const deserializeAws_restJson1ListStreamKeysCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1ListStreamsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListStreamsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        nextToken: undefined,
        streams: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.nextToken !== undefined && data.nextToken !== null) {
        contents.nextToken = data.nextToken;
    }
    if (data.streams !== undefined && data.streams !== null) {
        contents.streams = deserializeAws_restJson1StreamList(data.streams, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListStreamsCommand = deserializeAws_restJson1ListStreamsCommand;
const deserializeAws_restJson1ListStreamsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1ListTagsForResourceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListTagsForResourceCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        nextToken: undefined,
        tags: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.nextToken !== undefined && data.nextToken !== null) {
        contents.nextToken = data.nextToken;
    }
    if (data.tags !== undefined && data.tags !== null) {
        contents.tags = deserializeAws_restJson1Tags(data.tags, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListTagsForResourceCommand = deserializeAws_restJson1ListTagsForResourceCommand;
const deserializeAws_restJson1ListTagsForResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.ivs#InternalServerException":
            response = {
                ...(await deserializeAws_restJson1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1PutMetadataCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PutMetadataCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PutMetadataCommand = deserializeAws_restJson1PutMetadataCommand;
const deserializeAws_restJson1PutMetadataCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ChannelNotBroadcasting":
        case "com.amazonaws.ivs#ChannelNotBroadcasting":
            response = {
                ...(await deserializeAws_restJson1ChannelNotBroadcastingResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.ivs#ThrottlingException":
            response = {
                ...(await deserializeAws_restJson1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1StopStreamCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1StopStreamCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1StopStreamCommand = deserializeAws_restJson1StopStreamCommand;
const deserializeAws_restJson1StopStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ChannelNotBroadcasting":
        case "com.amazonaws.ivs#ChannelNotBroadcasting":
            response = {
                ...(await deserializeAws_restJson1ChannelNotBroadcastingResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "StreamUnavailable":
        case "com.amazonaws.ivs#StreamUnavailable":
            response = {
                ...(await deserializeAws_restJson1StreamUnavailableResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1TagResourceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1TagResourceCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1TagResourceCommand = deserializeAws_restJson1TagResourceCommand;
const deserializeAws_restJson1TagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.ivs#InternalServerException":
            response = {
                ...(await deserializeAws_restJson1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1UntagResourceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UntagResourceCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UntagResourceCommand = deserializeAws_restJson1UntagResourceCommand;
const deserializeAws_restJson1UntagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.ivs#InternalServerException":
            response = {
                ...(await deserializeAws_restJson1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1UpdateChannelCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UpdateChannelCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        channel: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.channel !== undefined && data.channel !== null) {
        contents.channel = deserializeAws_restJson1Channel(data.channel, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UpdateChannelCommand = deserializeAws_restJson1UpdateChannelCommand;
const deserializeAws_restJson1UpdateChannelCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ivs#AccessDeniedException":
            response = {
                ...(await deserializeAws_restJson1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ConflictException":
        case "com.amazonaws.ivs#ConflictException":
            response = {
                ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "PendingVerification":
        case "com.amazonaws.ivs#PendingVerification":
            response = {
                ...(await deserializeAws_restJson1PendingVerificationResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.ivs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ValidationException":
        case "com.amazonaws.ivs#ValidationException":
            response = {
                ...(await deserializeAws_restJson1ValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restJson1AccessDeniedExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "AccessDeniedException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1ChannelNotBroadcastingResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ChannelNotBroadcasting",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1ConflictExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ConflictException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1InternalServerExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InternalServerException",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1PendingVerificationResponse = async (parsedOutput, context) => {
    const contents = {
        name: "PendingVerification",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1ResourceNotFoundExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ResourceNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1ServiceQuotaExceededExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ServiceQuotaExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1StreamUnavailableResponse = async (parsedOutput, context) => {
    const contents = {
        name: "StreamUnavailable",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1ThrottlingExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ThrottlingException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const deserializeAws_restJson1ValidationExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ValidationException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        exceptionMessage: undefined,
    };
    const data = parsedOutput.body;
    if (data.exceptionMessage !== undefined && data.exceptionMessage !== null) {
        contents.exceptionMessage = data.exceptionMessage;
    }
    return contents;
};
const serializeAws_restJson1ChannelArnList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_restJson1DestinationConfiguration = (input, context) => {
    return {
        ...(input.s3 !== undefined &&
            input.s3 !== null && { s3: serializeAws_restJson1S3DestinationConfiguration(input.s3, context) }),
    };
};
const serializeAws_restJson1S3DestinationConfiguration = (input, context) => {
    return {
        ...(input.bucketName !== undefined && input.bucketName !== null && { bucketName: input.bucketName }),
    };
};
const serializeAws_restJson1StreamKeyArnList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_restJson1Tags = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const deserializeAws_restJson1BatchError = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        code: output.code !== undefined && output.code !== null ? output.code : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_restJson1BatchErrors = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1BatchError(entry, context);
    });
};
const deserializeAws_restJson1Channel = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        authorized: output.authorized !== undefined && output.authorized !== null ? output.authorized : undefined,
        ingestEndpoint: output.ingestEndpoint !== undefined && output.ingestEndpoint !== null ? output.ingestEndpoint : undefined,
        latencyMode: output.latencyMode !== undefined && output.latencyMode !== null ? output.latencyMode : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        playbackUrl: output.playbackUrl !== undefined && output.playbackUrl !== null ? output.playbackUrl : undefined,
        recordingConfigurationArn: output.recordingConfigurationArn !== undefined && output.recordingConfigurationArn !== null
            ? output.recordingConfigurationArn
            : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
        type: output.type !== undefined && output.type !== null ? output.type : undefined,
    };
};
const deserializeAws_restJson1ChannelList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1ChannelSummary(entry, context);
    });
};
const deserializeAws_restJson1Channels = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1Channel(entry, context);
    });
};
const deserializeAws_restJson1ChannelSummary = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        authorized: output.authorized !== undefined && output.authorized !== null ? output.authorized : undefined,
        latencyMode: output.latencyMode !== undefined && output.latencyMode !== null ? output.latencyMode : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        recordingConfigurationArn: output.recordingConfigurationArn !== undefined && output.recordingConfigurationArn !== null
            ? output.recordingConfigurationArn
            : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
    };
};
const deserializeAws_restJson1DestinationConfiguration = (output, context) => {
    return {
        s3: output.s3 !== undefined && output.s3 !== null
            ? deserializeAws_restJson1S3DestinationConfiguration(output.s3, context)
            : undefined,
    };
};
const deserializeAws_restJson1PlaybackKeyPair = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        fingerprint: output.fingerprint !== undefined && output.fingerprint !== null ? output.fingerprint : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
    };
};
const deserializeAws_restJson1PlaybackKeyPairList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1PlaybackKeyPairSummary(entry, context);
    });
};
const deserializeAws_restJson1PlaybackKeyPairSummary = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
    };
};
const deserializeAws_restJson1RecordingConfiguration = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        destinationConfiguration: output.destinationConfiguration !== undefined && output.destinationConfiguration !== null
            ? deserializeAws_restJson1DestinationConfiguration(output.destinationConfiguration, context)
            : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        state: output.state !== undefined && output.state !== null ? output.state : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
    };
};
const deserializeAws_restJson1RecordingConfigurationList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RecordingConfigurationSummary(entry, context);
    });
};
const deserializeAws_restJson1RecordingConfigurationSummary = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        destinationConfiguration: output.destinationConfiguration !== undefined && output.destinationConfiguration !== null
            ? deserializeAws_restJson1DestinationConfiguration(output.destinationConfiguration, context)
            : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        state: output.state !== undefined && output.state !== null ? output.state : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
    };
};
const deserializeAws_restJson1S3DestinationConfiguration = (output, context) => {
    return {
        bucketName: output.bucketName !== undefined && output.bucketName !== null ? output.bucketName : undefined,
    };
};
const deserializeAws_restJson1_Stream = (output, context) => {
    return {
        channelArn: output.channelArn !== undefined && output.channelArn !== null ? output.channelArn : undefined,
        health: output.health !== undefined && output.health !== null ? output.health : undefined,
        playbackUrl: output.playbackUrl !== undefined && output.playbackUrl !== null ? output.playbackUrl : undefined,
        startTime: output.startTime !== undefined && output.startTime !== null ? new Date(output.startTime) : undefined,
        state: output.state !== undefined && output.state !== null ? output.state : undefined,
        viewerCount: output.viewerCount !== undefined && output.viewerCount !== null ? output.viewerCount : undefined,
    };
};
const deserializeAws_restJson1StreamKey = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        channelArn: output.channelArn !== undefined && output.channelArn !== null ? output.channelArn : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
        value: output.value !== undefined && output.value !== null ? output.value : undefined,
    };
};
const deserializeAws_restJson1StreamKeyList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1StreamKeySummary(entry, context);
    });
};
const deserializeAws_restJson1StreamKeys = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1StreamKey(entry, context);
    });
};
const deserializeAws_restJson1StreamKeySummary = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        channelArn: output.channelArn !== undefined && output.channelArn !== null ? output.channelArn : undefined,
        tags: output.tags !== undefined && output.tags !== null
            ? deserializeAws_restJson1Tags(output.tags, context)
            : undefined,
    };
};
const deserializeAws_restJson1StreamList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1StreamSummary(entry, context);
    });
};
const deserializeAws_restJson1StreamSummary = (output, context) => {
    return {
        channelArn: output.channelArn !== undefined && output.channelArn !== null ? output.channelArn : undefined,
        health: output.health !== undefined && output.health !== null ? output.health : undefined,
        startTime: output.startTime !== undefined && output.startTime !== null ? new Date(output.startTime) : undefined,
        state: output.state !== undefined && output.state !== null ? output.state : undefined,
        viewerCount: output.viewerCount !== undefined && output.viewerCount !== null ? output.viewerCount : undefined,
    };
};
const deserializeAws_restJson1Tags = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
// Collect low-level response body stream to Uint8Array.
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
// Encode Uint8Array data into string with utf-8.
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const isSerializableHeaderValue = (value) => value !== undefined &&
    value !== null &&
    value !== "" &&
    (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) &&
    (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        return JSON.parse(encoded);
    }
    return {};
});
/**
 * Load an error code for the aws.rest-json-1.1 protocol.
 */
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
    return "";
};
//# sourceMappingURL=Aws_restJson1.js.map