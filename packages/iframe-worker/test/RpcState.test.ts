import { beforeEach, expect, jest, test } from '@jest/globals'
import type { WebView } from '../src/parts/WebView/WebView.ts'
import * as RpcState from '../src/parts/RpcState/RpcState.ts'

beforeEach(() => {
  RpcState.reset()
})

test('set and get', () => {
  const rpc = {
    invoke: jest.fn(),
  } as any
  const mockWebView: WebView = {
    origin: 'test-origin',
    portId: 1,
    rpc,
    webViewId: 'test-id',
    webViewUid: 1,
  }
  RpcState.set(1, mockWebView)
  expect(RpcState.get(1)).toBe(mockWebView)
})

test('has', () => {
  const rpc = {
    invoke: jest.fn(),
  } as any
  const mockWebView: WebView = {
    origin: 'test-origin',
    portId: 1,
    rpc,
    webViewId: 'test-id',
    webViewUid: 1,
  }
  RpcState.set(1, mockWebView)
  expect(RpcState.has(1)).toBe(true)
  expect(RpcState.has(2)).toBe(false)
})

test('getAll', () => {
  const rpc = {
    invoke: jest.fn(),
  } as any
  const mockWebView1: WebView = {
    origin: 'test-origin',
    portId: 1,
    rpc,
    webViewId: 'test-id-1',
    webViewUid: 1,
  }
  const mockWebView2: WebView = {
    origin: 'test-origin',
    portId: 2,
    rpc,
    webViewId: 'test-id-2',
    webViewUid: 2,
  }
  RpcState.set(1, mockWebView1)
  RpcState.set(2, mockWebView2)
  expect(RpcState.getAll()).toEqual({
    1: mockWebView1,
    2: mockWebView2,
  })
})

test('reset', () => {
  const rpc = {
    invoke: jest.fn(),
  } as any
  const mockWebView: WebView = {
    origin: 'test-origin',
    portId: 1,
    rpc,
    webViewId: 'test-id',
    webViewUid: 1,
  }
  RpcState.set(1, mockWebView)
  RpcState.reset()
  expect(RpcState.has(1)).toBe(false)
  expect(RpcState.getAll()).toEqual({})
})
