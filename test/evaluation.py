import os
import sys
import pickle
import zipfile
import shutil
from sklearn.metrics import f1_score

def calculate_macro_f1(groundtruth, predictions):
    """
    Calculate the macro-F1 score using sklearn.
    """
    return f1_score(groundtruth, predictions, average='macro')

def extract_zipfile(zip_path, extract_to="submission_unzipped"):
    """
    Extract the given zip file into a specified folder.
    If the folder already exists, remove it before extraction.
    """
    if os.path.exists(extract_to):
        shutil.rmtree(extract_to)  # Remove old folder if it exists
    os.makedirs(extract_to, exist_ok=True)

    with zipfile.ZipFile(zip_path, 'r') as z:
        z.extractall(extract_to)

    return extract_to

def find_submission_pkl(dir_path):
    """
    Search recursively for 'submission.pkl' inside 'dir_path'.
    Return the full path if found, else None.
    """
    for root, dirs, files in os.walk(dir_path):
        if "submission.pkl" in files:
            return os.path.join(root, "submission.pkl")
    return None

def main(zip_path):
    """
    Main evaluation routine:
    1. Extract submission zip.
    2. Locate submission.pkl
    3. Load ground truth (valid_y.pkl) from script directory
    4. Compute macro-F1
    5. Return macro-F1
    """
    script_dir = os.path.dirname(__file__)  # Current script directory

    # 1. Extract the zip file
    submission_folder = extract_zipfile(zip_path, extract_to="submission_unzipped")

    # 2. Find submission.pkl inside the extracted folder
    submission_pkl_path = find_submission_pkl(submission_folder)
    if submission_pkl_path is None:
        raise FileNotFoundError("Could not find 'submission.pkl' inside the extracted zip folder.")

    # 3. Load ground truth (valid_y.pkl)
    valid_y_path = os.path.join(script_dir, "valid_y.pkl")
    if not os.path.exists(valid_y_path):
        raise FileNotFoundError("'valid_y.pkl' not found in script directory.")

    with open(valid_y_path, 'rb') as f:
        valid_y = pickle.load(f)

    # 4. Load submission.pkl
    with open(submission_pkl_path, 'rb') as f:
        submission = pickle.load(f)

    # 5. Check lengths
    if len(valid_y) != len(submission):
        raise ValueError("Ground truth and predictions have different lengths.")

    # 6. Compute macro-F1
    macro_f1 = calculate_macro_f1(valid_y, submission)
    return macro_f1

if __name__ == "__main__":
    """
    Usage:
        python evaluation.py <submission_zip_file>

    Example:
        python evaluation.py submission.zip
    """
    if len(sys.argv) < 2:
        print("Usage: python evaluation.py <submission_zip_file>")
        sys.exit(1)

    zip_file_path = sys.argv[1]

    # Ensure the provided path is a .zip file
    if not zip_file_path.lower().endswith(".zip"):
        print("Error: The provided submission file is not a '.zip' file.")
        sys.exit(1)

    # Run the evaluation
    try:
        score = main(zip_file_path)
    except Exception as e:
        print(f"Exception during evaluation: {e}")
        sys.exit(1)

    # Print and save the result
    print(f"Macro-F1: {score:.4f}")
    with open("scores.txt", "w") as out:
        out.write(f"Macro-F1: {score:.4f}\n")
