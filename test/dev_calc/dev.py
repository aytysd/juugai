import json
import re
import glob
import os
import csv
import math

# PredictedDataフォルダのパスを指定
# predicted_path_data_folder = "./PredictedPathData"
# path_data_folder = "./PathData"
# csv_folder = "./csv"

predicted_path_data_folder = "PredictedPathData"
path_data_folder = "./PathData"
csv_folder = "csv"


# フォルダ内の全てのJSONファイルのパスを取得
json_files = glob.glob(os.path.join(predicted_path_data_folder, "*.json"))
# ファイル名のみを抽出してリストに格納
json_filenames = [os.path.basename(file) for file in json_files]

def euclidean_distance(x1, y1, x2, y2):
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

for predicted_path_json_file in json_filenames:
    with open(os.path.join(predicted_path_data_folder, predicted_path_json_file), 'r') as f1:
        path_json_file = re.sub('out', 'traj', predicted_path_json_file)
        with open(os.path.join(path_data_folder, path_json_file), 'r') as f2:
            temp = re.sub('-traj', '', path_json_file)
            csv_file = re.sub('json', 'csv', temp)
            with open(os.path.join(csv_folder, csv_file), 'w', newline='') as csvfile:
            # CSVライターオブジェクトを作成
                csvwriter = csv.writer(csvfile)
                data1 = json.load(f1)
                data2 = json.load(f2)

                data1_dict = {item['timestamp']: item for item in data1}
                data2_dict = {item['timestamp']: item for item in data2}

                # 共通のtimestampを見つけて距離を計算
                for timestamp in data1_dict.keys():
                    if timestamp in data2_dict:
                        point1 = data1_dict[timestamp]
                        point2 = data2_dict[timestamp]
                        distance = euclidean_distance(point1['x'], point1['y'], point2['x'], point2['y'])
                        print(f"Timestamp: {timestamp}, Distance: {distance:.4f}")
                        csvwriter.writerow([timestamp, f'{distance:.4f}'])