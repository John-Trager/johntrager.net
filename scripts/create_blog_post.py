import os
import sys
from datetime import date
import subprocess

if len(sys.argv) < 2:
    print("❌ Blog name required.\nUsage: python create_blog_post.py my-new-post")
    sys.exit(1)

blog_name = sys.argv[1]
folder_name = blog_name.replace(" ", "-").lower()
today = date.today().isoformat()

# Construct the new folder and file paths
base_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'content', 'blog', folder_name)
file_path = os.path.join(base_dir, 'index.mdx')

if os.path.exists(base_dir):
    print(f"❌ Folder already exists: {base_dir}")
    sys.exit(1)

# Create directory and file
os.makedirs(base_dir, exist_ok=True)

frontmatter = f"""---
title: "{blog_name.replace('-', ' ').title()}"
description: ""
date: "{today}"
draft: true
---
"""

with open(file_path, 'w') as f:
    f.write(frontmatter.strip())

print(f"✅ Created blog post: {file_path}")

# Open file in VSCode
try:
    subprocess.run(["code", file_path])
    print("📝 Opened in VSCode.")
except FileNotFoundError:
    print("⚠️ Could not open file — is the `code` command available in your PATH?")
