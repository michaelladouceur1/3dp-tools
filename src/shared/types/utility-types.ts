// export type NestedKeyOf<ObjectType extends object> = {
// 	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object ? `${Key}.${NestedKeyOf<ObjectType[Key]>}` : Key;
// }[keyof ObjectType & (string | number)];

// type NestedKeyOf2<ObjectType extends object> = {
// 	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object ? `${Key}.${NestedKeyOf<ObjectType[Key]>}` : Key;
// }[keyof ObjectType & (string | number)] & {
// 	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object ? `${Key}.${NestedKeyOf<ObjectType[Key]>}` : ObjectType[Key];
// };

// // type SplitString<ObjectType extends Object> = { [T in keyof ObjectType]: ObjectType[T] }[keyof ObjectType & (string | number)];

// // type NestedValueOf<ObjectType extends object, StringType extends string> = {
// // 	Extract<Key extends keyof ObjectType, StringType>
// // }

// type KeyValueOf<ObjectType extends object, Key extends keyof ObjectType, Value extends any> = Record<Key, Value>;

// type TestObject = {
// 	hello: number;
// 	testing: {
// 		description: string;
// 		value: number;
// 	};
// };

// type NestedTestObject = NestedKeyOf2<TestObject>;
// type TestType = {
// 	test: NestedTestObject;
// };

// const person: NestedTestObject = {
// 	hello: 2,
// 	testing: "testing.description",
// };

// const test = function <T extends NestedKeyOf<iSettings>>(field: T) {};
// const test2 = function <K extends NestedTestObject[0], V extends NestedTestObject[1]>(key: K, value: V) {};

// test("autoSave.description");

// "uiBackgroundColors.value.dark"

// 1) Split string into array of keys
// 2) Iterate through keys finding values
// 3) If last key, value is returned
